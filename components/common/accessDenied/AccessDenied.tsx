import { useTranslation } from "react-i18next";
import UI from "@/components/ui";
import React from "react";
import { openAppPermissionSettings } from "@/utils/permissions";

interface AccessDeniedProps {
    type: "geolocation";
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ type }) => {
    const { t } = useTranslation();

    const handleOpenSettings = async () => {
        await openAppPermissionSettings("geolocation");
    };

    return (
        <UI.YStack justify='center' flex={1}>
            <UI.Card padding="$4" bg="$background02">
                <UI.YStack gap='$2.5' items='center'>
                    <UI.Typo.H6>
                        {t("common.accessDenied.header")}
                    </UI.Typo.H6>

                    <UI.Typo.Text color={"black"}>
                        {t(`common.accessDenied.description.${type}`)}
                    </UI.Typo.Text>

                    <UI.Button onPress={handleOpenSettings}>
                        {t("common.accessDenied.submit")}
                    </UI.Button>
                </UI.YStack>
            </UI.Card>
        </UI.YStack>
    );
};

export default AccessDenied;
