import i18n, { TFunction } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "@/assets/locales/en.json";
import ru from "@/assets/locales/ru.json";

const SUPPORTED_LANGS = ["en", "ru"] as const;
type LangCode = (typeof SUPPORTED_LANGS)[number];

const DEFAULT_LANG: LangCode = "en";

const resources = {
    en: { translation: en },
    ru: { translation: ru },
} as const;

function resolveInitialLanguage(): LangCode {
    const locales = Localization.getLocales();
    const languageCode = locales[0]?.languageCode
        ?? locales[1]?.languageCode
        ?? DEFAULT_LANG;

    if (SUPPORTED_LANGS.includes(languageCode as LangCode)) {
        return languageCode as LangCode;
    }

    return DEFAULT_LANG;
}

let initialized = false;

function initResources(): Promise<TFunction> {
    if (initialized) {
        return Promise.resolve(i18n.t.bind(i18n));
    }
    initialized = true;

    return i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: resolveInitialLanguage(),
            fallbackLng: DEFAULT_LANG,

            interpolation: {
                escapeValue: false,
            },

            // important for RN?
            returnNull: false,
            returnEmptyString: false,
        });
}

// user manual switch
async function setLanguage(lang: LangCode) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    await i18n.changeLanguage(lang);
}


export default {
    initResources,
    setLanguage,
};
