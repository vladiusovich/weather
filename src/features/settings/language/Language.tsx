import { observer } from "mobx-react-lite";
import { ScrollView } from "tamagui";
import UI, { ListItemProps } from "src/shared/components/ui";
import { currentLanguage, SUPPORTED_LANGS } from "@services/translations/i18n";
import useChangeLanguage from "@hooks/useChangeLanguage";
import { Check } from "@tamagui/lucide-icons";

const Language = observer(() => {
    const { changeLanguage, isLoading } = useChangeLanguage();

    const items: ListItemProps[] = SUPPORTED_LANGS.map((lang) => {
        const currentLang = lang === currentLanguage();

        return {
            title: lang,
            onPress: () => changeLanguage(lang),
            iconAfter: currentLang ? Check : null,
            // disabled: currentLang,
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
