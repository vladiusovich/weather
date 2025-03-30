import DiaryStore from './stores/diary/DiaryStore';
import WeatherStore from './stores/weather/WeatherStore';

interface AppStoreType {
    weather: WeatherStore;
    diary: DiaryStore;
}

export default AppStoreType;
