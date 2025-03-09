import Weather from '@/components/screens/Weather';
import { observer } from 'mobx-react-lite';
import React from 'react';

const WeatherScreen = () => {
    return (
        <Weather />
    );
};

export default observer(WeatherScreen);
