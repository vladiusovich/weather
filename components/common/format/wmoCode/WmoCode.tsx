import React from 'react';
import UI from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { TextStyle } from 'tamagui';
import IconWmo from './IconWmo';

type WmoCodeProps = {
    value?: number | null;
    asIcon?: boolean;
} & TextStyle;

const WmoCode: React.FC<WmoCodeProps> = ({
    value,
    asIcon = true,
    ...props
}) => {
    const { t } = useTranslation();

    if (!value) {
        return null;
    }

    if (asIcon) {
        return <IconWmo value={value} />;
    }

    return (
        <UI.Typo.Text {...props}>
            {t(`meteo.wmo_codes.${value}`)}
        </UI.Typo.Text>
    );
};

export default WmoCode;
