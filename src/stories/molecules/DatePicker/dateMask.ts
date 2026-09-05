/* ─────────────────────────────────────────────────────────────────────────────
 * La fecha corta escrita a mano: qué orden llevan día, mes y año, con qué
 * separador y cómo se lee de vuelta lo que teclea quien rellena el campo.
 *
 * El orden y el separador NO se cablean por locale a mano: salen de
 * `Intl.DateTimeFormat(...).formatToParts()`, que es quien sabe que `es` escribe
 * 25/09/2026, `en-US` 09/25/2026 y `de` 25.09.2026.
 *
 * Las cifras se escriben siempre en dígitos ASCII, aunque el locale prefiera
 * otros (árabe, devanagari…): lo que se pinta en el campo tiene que poder
 * volver a leerse tecleado, y un teclado corriente escribe ASCII.
 * ───────────────────────────────────────────────────────────────────────────── */

export type DatePartName = 'day' | 'month' | 'year';

/** Letras de la máscara del marcador de posición: `dd/mm/aaaa` en castellano. */
export interface DateMaskLetters {
  day: string;
  month: string;
  year: string;
}

export const SPANISH_MASK_LETTERS: DateMaskLetters = { day: 'dd', month: 'mm', year: 'aaaa' };

export interface DateMask {
  /** Orden de las partes en ese locale, p. ej. `['day', 'month', 'year']`. */
  order: DatePartName[];
  /** Literal que separa las partes: `/`, `.`, `-`… */
  separator: string;
  /** La fecha escrita en ese orden, con las cifras rellenadas: `25/09/2026`. */
  format(date: Date): string;
  /** La máscara de ejemplo con las letras dadas: `dd/mm/aaaa`. */
  mask(letters: DateMaskLetters): string;
  /** Lee la fecha tecleada. `null` si está incompleta o no existe. */
  parse(text: string): Date | null;
}

/** Marcas de dirección que `Intl` intercala en locales RTL y que no son texto. */
const DIRECTION_MARKS = /[‎‏؜]/g;

/** Una fecha cualquiera con las tres partes distinguibles entre sí. */
const SAMPLE = new Date(2026, 8, 25);

function pad(value: number, length: number): string {
  return String(value).padStart(length, '0');
}

export function getDateMask(locale: string): DateMask {
  const parts = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).formatToParts(SAMPLE);

  const order = parts
    .filter((part): part is Intl.DateTimeFormatPart & { type: DatePartName } =>
      part.type === 'day' || part.type === 'month' || part.type === 'year'
    )
    .map((part) => part.type);

  const literal = parts
    .find((part) => part.type === 'literal' && part.value.replace(DIRECTION_MARKS, '').trim() !== '')
    ?.value.replace(DIRECTION_MARKS, '')
    .trim();

  const separator = literal || '/';

  const lengths: Record<DatePartName, number> = { day: 2, month: 2, year: 4 };

  function format(date: Date): string {
    const values: Record<DatePartName, number> = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    return order.map((name) => pad(values[name], lengths[name])).join(separator);
  }

  function mask(letters: DateMaskLetters): string {
    return order.map((name) => letters[name]).join(separator);
  }

  function parse(text: string): Date | null {
    const clean = text.replace(DIRECTION_MARKS, '').trim();
    // Una letra suelta («25 de sept») no es la fecha corta: el campo pide cifras.
    if (/\p{L}/u.test(clean)) return null;

    const groups = clean.split(/\D+/).filter(Boolean);
    if (groups.length !== 3) return null;

    const raw = {} as Record<DatePartName, string>;
    order.forEach((name, index) => {
      raw[name] = groups[index];
    });

    // El año va entero: `25/09/26` no es «2026» ni «1926», es una fecha a
    // medio escribir. Adivinar el siglo cambiaría la fecha sin avisar.
    if (raw.year.length !== 4) return null;
    if (raw.day.length > 2 || raw.month.length > 2) return null;

    const year = Number(raw.year);
    const month = Number(raw.month);
    const day = Number(raw.day);

    const date = new Date(year, month - 1, day);
    // El 31 de febrero no existe: `Date` lo desborda al 3 de marzo, así que la
    // fecha vale solo si vuelve con las mismas tres cifras que entraron.
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }
    return date;
  }

  return { order, separator, format, mask, parse };
}
