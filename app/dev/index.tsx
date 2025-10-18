import Uikit from "@/components/screens/uikit/Uikit";
import { Stack } from "expo-router";

const SettingsScreen = () => {

    return (
        <>
            <Stack.Screen options={{
                title: "Dev mode",
                headerRight: () => null,
            }} />
            <Uikit />
        </>
    );
};

export default SettingsScreen;
