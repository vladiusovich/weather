import React from "react";
import UI from "@components/ui";
import Format from "@components/common/format";
import { useTranslation } from "react-i18next";

type Props = {
    apparentTemperature?: number;
    temperature2mMax?: number;
    temperature2mMin?: number;
    weatherCode?: number;
};

const LabelTemp: React.FC<{ label: string; value?: number | null }> = ({ label, value }) => {
    if (value == null) return null;
    return (
        <UI.XStack gap="$1">
            <UI.Typo.Text>{label}</UI.Typo.Text>
            <Format.Temp value={value} />
        </UI.XStack>
    );
};

const CurrentTemperatureCard: React.FC<Props> = ({
    apparentTemperature,
    temperature2mMax,
    temperature2mMin,
    weatherCode,
}) => {
    const { t } = useTranslation();

    const showExtremes = temperature2mMax != null || temperature2mMin != null;

    return (
        <UI.Paper flex={1}>
            <UI.YStack justify="center" gap="$2">
                <UI.YStack gap="$1">
                    <Format.WmoCode fontSize="$1" value={weatherCode} />
                    <Format.Temp fontSize="$10" value={apparentTemperature} />
                </UI.YStack>

                <UI.XStack gap="$2" items="center">
                    <UI.Typo.Text>{t("meteo.glossary.apparent_temperature")}</UI.Typo.Text>
                    <Format.Temp value={apparentTemperature} />
                </UI.XStack>

                {showExtremes && (
                    <UI.XStack gap="$2">
                        <LabelTemp label={t("meteo.glossary.temperature_2m_max")} value={temperature2mMax} />
                        <LabelTemp label={t("meteo.glossary.temperature_2m_min")} value={temperature2mMin} />
                    </UI.XStack>
                )}
            </UI.YStack>
        </UI.Paper>
    );
};

export default React.memo(CurrentTemperatureCard);
