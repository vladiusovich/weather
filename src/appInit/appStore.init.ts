import { AppServicesRootType } from "@services/AppServicesRootType";
import AppStoreType from "../appStore/AppStoreType";
import DiaryStore from "../appStore/diary/DiaryStore";
import WeatherStore from "../appStore/weather/WeatherStore";

const initAppStore = async (services: AppServicesRootType) => {
    const weather = new WeatherStore(services);
    const diary = new DiaryStore(services);

    const appStore: AppStoreType = {
        weather,
        diary,
    };

    return appStore;
};

export default initAppStore;
