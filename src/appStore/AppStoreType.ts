import DiaryStore from "./diary/DiaryStore";
import WeatherStore from "./weather/WeatherStore";

interface AppStoreType {
    weather: WeatherStore;
    diary: DiaryStore;
}

export default AppStoreType;
