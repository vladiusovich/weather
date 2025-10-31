import { observer } from "mobx-react-lite";
import { ScrollView } from "tamagui";
import UI, { ListItemProps } from "@/components/ui";
import { currentLanguage, SUPPORTED_LANGS } from "@/services/translations/i18n";
import useChangeLanguage from "@/hooks/useChangeLanguage";
import { Earth } from "@tamagui/lucide-icons";
import { useTranslation } from "react-i18next";

const Language = observer(() => {
    const { t } = useTranslation();

    const { changeLanguage, isLoading } = useChangeLanguage();

    const items: ListItemProps[] = SUPPORTED_LANGS.map((lang) => {
        const currentLang = lang === currentLanguage();

        return {
            title: lang,
            onPress: () => changeLanguage(lang),
            iconAfter: currentLang ? Earth : null,
            disabled: currentLang,
        };
    });

    return (
        <>
            <UI.Loader fullScreen isLoading={isLoading} />
            <UI.ScreenWrapper Component={ScrollView}>
                <UI.List items={items} />
            </UI.ScreenWrapper>
        </>
    );
});

export default Language;
