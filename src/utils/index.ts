export function calcCsssRem(value: number): string {
  return `${parseFloat(`${value / 16}`)}rem`;
}

export function formatMoney(value: number): string {
  const formatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
}

export function normalizeMoney(value: string): number {
  return Number(value.replace(/[^0-9-]/g, '')) / 100;
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
