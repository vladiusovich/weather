import React from 'react';
import UI, { TypographyProps } from '@/components/ui';
import { useTranslation } from 'react-i18next';

type WmoCodeProps = {
    value?: number | null;
} & Omit<TypographyProps, 'children'>;

const WmoCode: React.FC<WmoCodeProps> = ({ value, ...props }) => {
    const { t } = useTranslation();

    if (!value) {
        return null;
    }

    return (
        <UI.Typography {...props}>
            {t(`meteo.wmo_codes.${value}`)}
        </UI.Typography>
    );
};

export default WmoCode;
