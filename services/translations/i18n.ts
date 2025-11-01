import i18n, { TFunction } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "@/assets/locales/en.json";
import ru from "@/assets/locales/ru.json";

export const SUPPORTED_LANGS = ["en", "ru"] as const;
export type LangCode = (typeof SUPPORTED_LANGS)[number];

const DEFAULT_LANG: LangCode = "en";

const resources = {
    en: { translation: en },
    ru: { translation: ru },
} as const;


const resolveInitialLanguage = async (): Promise<LangCode> => {
    const savedLang = await AsyncStorage.getItem("appLang") as LangCode;

    if (savedLang) {
        return savedLang;
    }

    const locales = Localization.getLocales();
    const languageCode = locales[0]?.languageCode
        ?? locales[1]?.languageCode
        ?? DEFAULT_LANG;

    if (SUPPORTED_LANGS.includes(languageCode as LangCode)) {
        return languageCode as LangCode;
    }

    return DEFAULT_LANG;
};

let initialized = false;

export const initResources = async (): Promise<TFunction> => {
    if (initialized) {
        return Promise.resolve(i18n.t.bind(i18n));
    }
    initialized = true;

    const lng = await resolveInitialLanguage();

    return i18n
        .use(initReactI18next)
        .init({
            resources,
            lng,
            fallbackLng: DEFAULT_LANG,

            interpolation: {
                escapeValue: false,
            },

            // important for RN?
            returnNull: false,
            returnEmptyString: false,
        });
};

export const currentLanguage = () => (i18n.language);

// user manual switch
export const setLanguage = async (lang: LangCode) => {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    try {
        await i18n.changeLanguage(lang);
        await AsyncStorage.setItem("appLang", lang);
    } catch {
        await i18n.changeLanguage(DEFAULT_LANG);
        await AsyncStorage.setItem("appLang", DEFAULT_LANG);
    }
};
