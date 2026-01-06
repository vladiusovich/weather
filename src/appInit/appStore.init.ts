import { AppServicesRootType } from "@services/AppServicesRootType";
import AppStoreType from "../appStore/AppStoreType";
import DiaryStore from "../appStore/diary/DiaryStore";
import WeatherStore from "../appStore/weather/WeatherStore";

const initAppStore = async (services: AppServicesRootType) => {
    const appStore: AppStoreType = {
        weather: new WeatherStore(services),
        diary: new DiaryStore(services),
    };

    return appStore;
};

export default initAppStore;
