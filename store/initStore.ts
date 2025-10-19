import { ServicesRootType } from "@/services";
import AppStoreType from "./AppStoreType";
import DiaryStore from "./stores/diary/DiaryStore";
import WeatherStore from "./stores/weather/WeatherStore";

export const initAppStories = async (services: ServicesRootType) => {
    const weather = new WeatherStore(services);
    const diary = new DiaryStore(services);

    const appStore: AppStoreType = {
        weather,
        diary,
    };

    return appStore;
};
