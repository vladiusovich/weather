import { observer } from 'mobx-react-lite';
import React from 'react';
import Weather from '@/components/screens/weather';

const WeatherScreen = () => {
    return (
        <Weather />
    );
};

export default observer(WeatherScreen);
