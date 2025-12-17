import { i18n as I18nInstance, TFunction } from "i18next";

/**
 * Returns the translation for the first existing key in the given list.
 * If none of the keys exist in i18n resources, returns the provided fallback.
 *
 * @param i18n      i18n instance (from useTranslation().i18n)
 * @param t         translation function (from useTranslation().t)
 * @param keys      list of translation keys in priority order
 * @param fallback  fallback value if no key is found (default: empty string)
 *
 * @example
 * const text = findTranslation(
 *   i18n,
 *   t,
 *   [
 *     `a.b.${code}`,
 *     `a.b.${name}`,
 *     `a.c.d`,
 *   ],
 *   fallbackValue ?? ""
 * );
 */
export function findTranslation(
    i18n: I18nInstance,
    t: TFunction,
    keys: (string | undefined | null)[],
    fallback: string = "",
): string {
    const validKeys = keys.filter(Boolean) as string[];

    const existingKey = validKeys.find((key) => i18n.exists(key));

    if (existingKey) {
        return t(existingKey);
    }

    return fallback;
}