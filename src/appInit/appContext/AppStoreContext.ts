import AppStoreType from "@store/AppStoreType";
import React from "react";

// TODO: now - use appStoreType, in future: extend to services and etc???
const AppContext = React.createContext<AppStoreType>(
    null as unknown as AppStoreType,
);

export default AppContext;
