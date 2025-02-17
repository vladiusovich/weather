import React from 'react';
import AppStoreType from '../AppStoreType';

const AppStoreContext = React.createContext<AppStoreType>(
    null as unknown as AppStoreType,
);

export default AppStoreContext;
