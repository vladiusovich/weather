import { useTranslation } from "react-i18next";
import UI from "src/shared/components/ui";
import React from "react";
import { openAppPermissionSettings, SystemPermissionType } from "@utils/permissions";

interface AccessDeniedStaticProps {
    permission: SystemPermissionType;
}

const AccessDenied: React.FC<AccessDeniedStaticProps> = ({ permission }) => {
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
        <UI.FallbackMessage
            header={header}
            description={description}
            actions={[{
                onPress: handleOpenSettings,
                children: submit,
            }]}
        />
    );
};

export default AccessDenied;
