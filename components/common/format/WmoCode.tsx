import React from 'react';
import UI from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { TextStyle } from 'tamagui';

type WmoCodeProps = {
    value?: number | null;
} & TextStyle;

const WmoCode: React.FC<WmoCodeProps> = ({ value, ...props }) => {
    const { t } = useTranslation();

    if (!value) {
        return null;
    }

    return (
        <UI.Typo.Text {...props}>
            {t(`meteo.wmo_codes.${value}`)}
        </UI.Typo.Text>
    );
};

export default WmoCode;
