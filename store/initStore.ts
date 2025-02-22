import AppStoreType from './AppStoreType';
import WeatherStore from './stores/weather/WeatherStore';

const weather = new WeatherStore();

const appStore: AppStoreType = {
    weather,
};

export default appStore;
