export function calcCsssRem(value: number): string {
  return `${parseFloat(`${value / 16}`)}rem`;
}

export function formattedMoney(value: number | string, options?: Intl.NumberFormatOptions): string {
  const defaultOptions = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  } as Intl.NumberFormatOptions;

  const formatter = Intl.NumberFormat('pt-BR', { ...defaultOptions, ...(options ?? {}) });

  return formatter.format(value as number);
}

export function normalizeMoney(value: string): number {
  return Number(value.replace(/[^0-9-]/g, '')) / 100;
}

export function formattedDate(
  date: number | Date | string | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'America/Sao_Paulo'
  } as Intl.DateTimeFormatOptions;

  const formatter = Intl.DateTimeFormat('pr-BR', { ...defaultOptions, ...(options ?? {}) });

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return formatter.format(date);
}

export function bytesToSize(bytes: number, decimals = 2): string {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function formatMask(value: string, mask: string): string {
  let maskedValue = '';
  let maskedIndex = 0;
  // eslint-disable-next-line no-useless-escape
  const unmasked = value.replace(/[\-\|\(\)\/\.\: ]/gm, '');
  const valueLength = unmasked.length;
  const maskLength = mask.replace(/[^#]/gm, '').length;

  if (valueLength > maskLength || maskLength > valueLength) {
    return value || '';
  }

  for (let i = 0; i < String(mask).length; i += 1) {
    if (mask[i] === '#' && typeof unmasked[maskedIndex] !== 'undefined') {
      maskedValue += unmasked[maskedIndex];
      maskedIndex += 1;
    } else if (typeof mask[i] !== 'undefined') {
      maskedValue += mask[i];
    }
  }

  return maskedValue;
}

export function formatCpf(value: string): string {
  return formatMask(value, '###.###.###-##');
}

export function sleep(ms = 0): Promise<unknown> {
  return new Promise(resolve => setTimeout(() => resolve, ms));
}

type ClipboardCallback = (text: string) => void;

export function clipboard(text: string, callback?: ClipboardCallback): void {
  const textArea = document.createElement('textarea');

  textArea.innerText = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();

  if (typeof callback === 'function') {
    callback(text);
  }
}

// export function dateFormat(date, format = 'brtime') {
//   if (!date) {
//     return null;
//   }

//   if (format.startsWith('us')) {
//     return date.format(`YYYY-MM-DD${format === 'ustime' ? ' HH:mm:ss' : ''}`);
//   }

//   if (format.startsWith('br')) {
//     return date.format(`L${format === 'brtime' ? ' LT' : ''}`);
//   }

//   return date.format(format);
// }
