import { observer } from "mobx-react-lite";
import { Annoyed } from "@tamagui/lucide-icons";
import { useTranslation } from "react-i18next";
import UI from "src/shared/components/ui";

const NoData: React.FC = () => {
    const { t } = useTranslation();

    return (
        <UI.YStack
            flex={1}
        >
            <UI.YStack
                justify='center'
                items='center'
                gap='$3'
                flex={1}
            >
                <Annoyed size={60} />
                <UI.Typo.Text>
                    {t("common.noData.header")}
                </UI.Typo.Text>
            </UI.YStack>
        </UI.YStack>
    );
};

export default observer(NoData);
