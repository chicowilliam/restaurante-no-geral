import { restaurant } from '../data/restaurant';
import { buttonContent } from './buttons';
import { setSmoothScrollPaused } from '../lib/smooth-scroll';

const copy = restaurant.reservation.dialog;

export function reservationButton(label: string, className = 'button button--primary'): string {
  const isButton = className.split(' ').includes('button');
  return `<button class="${className}${isButton ? ' btn-primary' : ' btn-text'}" type="button" data-reservation-open aria-haspopup="dialog" aria-controls="reservation-dialog">${isButton ? buttonContent(label) : label}</button>`;
}

function timeOptions(times: readonly string[], selected = ''): string {
  return times.map((time) => `<label class="reservation-option"><input type="radio" name="time" value="${time}"${time === selected ? ' checked' : ''}><span>${time}</span></label>`).join('');
}

export function reservationDialog(): string {
  return `<dialog class="reservation-dialog" id="reservation-dialog" data-lenis-prevent aria-labelledby="booking-title" aria-describedby="booking-note">
    <div class="reservation-dialog__inner">
      <header class="reservation-dialog__header"><p class="eyebrow">${copy.label}</p><button class="reservation-dialog__close" type="button" data-reservation-close aria-label="${copy.close}" title="${copy.close}"><span aria-hidden="true"></span><span aria-hidden="true"></span></button><h2 id="booking-title">${copy.heading}</h2></header>
      <form class="reservation-form" novalidate>
        <fieldset class="reservation-field" id="booking-people" aria-describedby="booking-people-error"><legend>${copy.peopleLabel}</legend><div class="reservation-options reservation-options--people">${copy.people.map((option, index) => `<label class="reservation-option"><input type="radio" name="people" value="${option.value}"${index === 0 ? ' checked' : ''}><span>${option.label}</span></label>`).join('')}</div><p class="reservation-error" id="booking-people-error" aria-live="polite"></p></fieldset>
        <div class="reservation-field"><label for="booking-date">${copy.dateLabel}</label><input class="reservation-date" type="date" name="date" id="booking-date" aria-describedby="booking-date-error" required><p class="reservation-error" id="booking-date-error" aria-live="polite"></p></div>
        <fieldset class="reservation-field" id="booking-time" aria-describedby="booking-time-error"><legend>${copy.timeLabel}</legend><div class="reservation-options reservation-options--time">${timeOptions(copy.services[0].times)}</div><p class="reservation-error" id="booking-time-error" aria-live="polite"></p></fieldset>
        <p class="reservation-dialog__note" id="booking-note">${copy.note}</p>
        <button class="button button--primary btn-primary reservation-dialog__submit" type="submit">${buttonContent(copy.continue)}</button>
        <p class="reservation-error" id="booking-contact-error" role="status"></p>
        <div class="reservation-dialog__bottom"><button class="reservation-dialog__cancel" type="button" data-reservation-close>${copy.cancel}</button><p>${copy.demoNote}</p></div>
      </form>
    </div>
  </dialog>`;
}

function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function parseDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return localDate(date) === value ? date : undefined;
}

function availableTimes(date: Date): readonly string[] {
  return copy.services.find((service) => service.days.some((day) => day === date.getDay()))?.times ?? [];
}

export function initReservation(): void {
  const dialog = document.querySelector<HTMLDialogElement>('#reservation-dialog');
  const form = dialog?.querySelector<HTMLFormElement>('form');
  const dateInput = dialog?.querySelector<HTMLInputElement>('#booking-date');
  const timeOptionsContainer = dialog?.querySelector<HTMLElement>('.reservation-options--time');
  if (!dialog || !form || !dateInput || !timeOptionsContainer) return;

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let opener: HTMLElement | null = null;
  let savedScroll = { x: 0, y: 0 };
  let savedBodyStyles: [string, string][] = [];
  let closingTimer: ReturnType<typeof setTimeout> | undefined;
  let bodyLocked = false;
  const bodyProperties = ['position', 'top', 'left', 'right', 'overflow', 'padding-right'];

  const selected = (name: string) => form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value;
  const setError = (field: 'people' | 'date' | 'time' | 'contact', message = '') => {
    const error = dialog.querySelector<HTMLElement>(`#booking-${field}-error`);
    if (error) error.textContent = message;
    const control = dialog.querySelector<HTMLElement>(`#booking-${field}`);
    if (message) control?.setAttribute('aria-invalid', 'true');
    else control?.removeAttribute('aria-invalid');
  };

  const updateTimes = () => {
    const date = parseDate(dateInput.value);
    const times = date ? availableTimes(date) : copy.services[0].times;
    timeOptionsContainer.innerHTML = timeOptions(times, selected('time'));
    setError('time');
    setError('date', date && !times.length ? copy.errors.closedDate : '');
  };

  const unlockBody = () => {
    savedBodyStyles.forEach(([property, value]) => {
      if (value) document.body.style.setProperty(property, value);
      else document.body.style.removeProperty(property);
    });
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    setSmoothScrollPaused(false, savedScroll.y);
    window.scrollTo(savedScroll.x, savedScroll.y);
    document.documentElement.style.scrollBehavior = scrollBehavior;
  };

  const restorePage = () => {
    if (!bodyLocked) return;
    bodyLocked = false;
    dialog.classList.remove('is-open');
    if (closingTimer !== undefined) clearTimeout(closingTimer);
    closingTimer = undefined;
    unlockBody();
    const focusTarget = opener?.getClientRects().length ? opener : document.querySelector<HTMLElement>('.site-header__toggle');
    focusTarget?.focus({ preventScroll: true });
    opener = null;
  };

  const finishClose = () => {
    if (closingTimer !== undefined) clearTimeout(closingTimer);
    closingTimer = undefined;
    if (dialog.open) dialog.close();
    // A new WhatsApp tab can defer the native close event; release the page now.
    restorePage();
  };

  const close = () => {
    if (!dialog.open || closingTimer !== undefined) return;
    dialog.classList.remove('is-open');
    if (preference.matches) finishClose();
    else closingTimer = setTimeout(finishClose, parseFloat(getComputedStyle(dialog).getPropertyValue('--motion-sheet')) || 360);
  };

  document.addEventListener('click', (event) => {
    const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-reservation-open]') : null;
    if (!trigger || dialog.open) return;
    opener = trigger;
    dateInput.min = localDate();
    updateTimes();
    savedScroll = { x: window.scrollX, y: window.scrollY };
    setSmoothScrollPaused(true);
    savedBodyStyles = bodyProperties.map((property) => [property, document.body.style.getPropertyValue(property)]);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(document.body).paddingRight);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScroll.y}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${padding + scrollbarWidth}px`;
    bodyLocked = true;
    dialog.showModal();
    // Establish the sheet's starting position only when it opens, never on scroll.
    void dialog.offsetHeight;
    dialog.classList.add('is-open');
    form.querySelector<HTMLInputElement>('input[name="people"]:checked')?.focus({ preventScroll: true });
  });

  dialog.querySelectorAll<HTMLButtonElement>('[data-reservation-close]').forEach((button) => button.addEventListener('click', close));
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])')].filter((control) => {
      if (!control.getClientRects().length) return false;
      if (control instanceof HTMLInputElement && control.type === 'radio') {
        const group = [...form.querySelectorAll<HTMLInputElement>(`input[name="${control.name}"]`)];
        return control === (group.find((radio) => radio.checked) ?? group[0]);
      }
      return true;
    });
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); close(); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => {
    if (!dialog.open) restorePage();
  });
  preference.addEventListener('change', () => { if (preference.matches && closingTimer !== undefined) finishClose(); });
  dateInput.addEventListener('change', updateTimes);
  form.addEventListener('change', (event) => {
    if (event.target instanceof HTMLInputElement && (event.target.name === 'people' || event.target.name === 'time')) setError(event.target.name);
    setError('contact');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const people = selected('people');
    const date = parseDate(dateInput.value);
    const time = selected('time');
    const dateError = !date ? copy.errors.date : dateInput.value < localDate() ? copy.errors.pastDate : !availableTimes(date).length ? copy.errors.closedDate : '';
    const timeError = !time || (date && !availableTimes(date).includes(time)) ? copy.errors.time : '';
    setError('people', people ? '' : copy.errors.people);
    setError('date', dateError);
    setError('time', timeError);
    if (!people || dateError || timeError || !date || !time) {
      const invalidControl = !people ? form.querySelector<HTMLInputElement>('input[name="people"]') : dateError ? dateInput : form.querySelector<HTMLInputElement>('input[name="time"]');
      invalidControl?.focus();
      return;
    }
    const number = restaurant.visit.whatsappNumber.replace(/\D/g, '');
    if (!/^55\d{10,11}$/.test(number)) { setError('contact', copy.errors.contact); return; }
    const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date);
    const message = `${copy.message}\n\n${copy.peopleLabel}: ${people}\n${copy.dateLabel}: ${formattedDate}\n${copy.timeLabel}: ${time}`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    close();
  });
}
