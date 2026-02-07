import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { ChevronRight, Languages, SunMoon } from "@tamagui/lucide-icons";
import UI from "src/shared/components/ui";
import { ScrollView } from "tamagui";
import { useTranslation } from "react-i18next";

const Settings = () => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <UI.ScreenWrapper Component={ScrollView}>
            <UI.List
                items={[
                    {
                        icon: Languages,
                        title: t("screens.languages.title"),
                        iconAfter: ChevronRight,
                        onPress: () => router.push("/settings/language"),
                    },
                    {
                        icon: SunMoon,
                        title: "Theme",
                        iconAfter: ChevronRight,
                        onPress: () => router.push("/settings/theme"),
                    },
                ]}
            />
        </UI.ScreenWrapper>
    );
};

export default observer(Settings);
