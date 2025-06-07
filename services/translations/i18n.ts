import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/assets/locales/en.json';

// TODO: Get the device language
const deviceLanguage = 'en';

const resources = {
    en: {
        translation: en,
    },
    // additional languages...
};

const init = () => {
    console.log('i18n.init:', {
        deviceLanguage,
    });

    return i18n.use(initReactI18next) // Passes i18n down to react-i18next
        .init({
            resources,
            lng: deviceLanguage, // Set the language based on the device
            fallbackLng: 'en', // Fallback language if the device language isn't available

            interpolation: {
                escapeValue: false, // React already safes from XSS
            },
        });
};

export default {
    init,
};
