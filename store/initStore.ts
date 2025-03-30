import AppStoreType from './AppStoreType';
import DiaryStore from './stores/diary/DiaryStore';
import WeatherStore from './stores/weather/WeatherStore';

const weather = new WeatherStore();
const diary = new DiaryStore();

const appStore: AppStoreType = {
    weather,
    diary,
};

export default appStore;
