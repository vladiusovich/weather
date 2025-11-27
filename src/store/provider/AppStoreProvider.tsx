import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AppStoreContext from "./AppStoreContext";
import { AppContext } from "@services/appContext";
import AppStoreType from "../AppStoreType";
import { SplashScreen } from "expo-router";

export interface AppStoreProviderProps {
    children: React.ReactNode;
}

/*
    Async init in runtime. Avoid EAS's buildtime errors.
*/
const AppStoreProvider: React.FC<AppStoreProviderProps> = ({ children }) => {
    const [appStore, setAppStore] = useState<AppStoreType | null>(null);

    useEffect(() => {
        const init = (async () => {
            const ctx = new AppContext();
            await ctx.init();
            setAppStore(ctx.appStore!);
        });

        if (appStore) {
            SplashScreen.hideAsync();
        } else {
            init();
        }
    }, [appStore]);

    if (!appStore) return null;

    return (
        <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};

export default observer(AppStoreProvider);
