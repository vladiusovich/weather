import { useTranslation } from "react-i18next";
import UI from "@/components/ui";
import React from "react";
import { openAppPermissionSettings, SystemPermissionType } from "@/utils/permissions";

interface AccessDeniedStaticProps {
    permission: SystemPermissionType;
}

const AccessDeniedStatic: React.FC<AccessDeniedStaticProps> = ({ permission }) => {
    const { t } = useTranslation();

    const handleOpenSettings = async () => {
        await openAppPermissionSettings("geolocation");
    };

    const header = t(
        `common.accessDenied.${permission}.header`,
        { defaultValue: t("common.accessDenied.header") }
    );

    const description = t(
        `common.accessDenied.${permission}.description`,
        { defaultValue: t("common.accessDenied.description") }
    );

    const submit = t(
        `common.accessDenied.${permission}.submit`,
        { defaultValue: t("common.accessDenied.submit") }
    );

    return (
        <UI.YStack justify='center' flex={1}>
            <UI.YStack gap='$3' items='center'>
                <UI.Typo.H4>
                    {header}
                </UI.Typo.H4>

                <UI.Typo.Text>
                    {description}
                </UI.Typo.Text>

                <UI.Button onPress={handleOpenSettings}>
                    {submit}
                </UI.Button>
            </UI.YStack>
        </UI.YStack>
    );
};

export default AccessDeniedStatic;
