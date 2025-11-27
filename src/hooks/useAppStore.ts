import { useContext } from "react";
import AppStoreContext from "../store/provider/AppStoreContext";

const useAppStore = () => useContext(AppStoreContext);

export default useAppStore;
