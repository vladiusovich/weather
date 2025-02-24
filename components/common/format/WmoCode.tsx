import React from 'react';
import UI from '@/components/ui';
import { useTranslation } from 'react-i18next';

type WmoCodeProps = {
    value?: number | null;
};

const WmoCode: React.FC<WmoCodeProps> = ({ value, ...props }) => {
    const { t } = useTranslation();

    if (!value) {
        return null;
    }

    return <UI.Typo.Text>{t(`meteo.wmo_codes.${value}`)}</UI.Typo.Text>;
};

export default WmoCode;
