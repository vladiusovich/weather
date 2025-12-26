import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AppContext from "./AppStoreContext";
import { AppContextCreator } from "src/appInit/appContextCreator";
import AppStoreType from "../../appStore/AppStoreType";
import { SplashScreen } from "expo-router";

export interface AppStoreProviderProps {
    children: React.ReactNode;
}

/*
    Async init in runtime. Avoid EAS's buildtime errors.
*/
const AppContextProvider: React.FC<AppStoreProviderProps> = ({ children }) => {
    // TODO: provide servesies also?
    const [appStore, setAppStore] = useState<AppStoreType | null>(null);

    useEffect(() => {
        const init = (async () => {
            const ctx = new AppContextCreator();
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
        <AppContext.Provider value={appStore}>
            {children}
        </AppContext.Provider>
    );
};

export default observer(AppContextProvider);
