import AppStoreType from './AppStoreType';
import WeatherStore from './stores/WeatherStore';

const weather = new WeatherStore();

const appStore: AppStoreType = {
    weather,
};

export default appStore;
