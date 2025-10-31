import { useState } from "react";
import { LangCode, setLanguage, currentLanguage } from "@/services/translations/i18n";

export const useChangeLanguage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const changeLanguage = async (lang: LangCode) => {
        if (currentLanguage() === lang) return;
        setIsLoading(true);

        // It's a trick
        await Promise.resolve();
        try {
            await setLanguage(lang);
        } finally {
            setIsLoading(false);
        }
    };
    return {
        changeLanguage,
        isLoading
    };
};

export default useChangeLanguage;
