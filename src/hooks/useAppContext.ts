import { useContext } from "react";
import AppContext from "src/appInit/appContext/AppStoreContext";

const useAppContext = () => useContext(AppContext);

export default useAppContext;
