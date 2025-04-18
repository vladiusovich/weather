import React from 'react';
import { observer } from 'mobx-react-lite';
import AppStoreContext from './AppStoreContext';
import appStore from '../initStore';

export interface AppStoreProviderProps {
    children: React.ReactNode;
}

const AppStoreProvider: React.FC<AppStoreProviderProps> = ({ children }) => {
    return (
        <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};

export default observer(AppStoreProvider);
