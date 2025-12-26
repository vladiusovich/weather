import UI from "src/shared/components/ui";
import { observer } from "mobx-react-lite";
import useAppContext from "@hooks/useAppContext";

const LocationStatus: React.FC = () => {
    const appStore = useAppContext();
    const currentLocation = appStore.weather.weatherSettings.currentLocation;

    return (
        <UI.Card padding='$3' bg={"$background02"}>
            <UI.YStack justify={"space-between"} gap={"$2"}>
                <UI.XStack gap={"$2"} justify={"center"}>
                    <UI.Typo.Text fontSize={"$1"} fontWeight={700}>
                        {currentLocation?.latitude.toFixed(2)}
                    </UI.Typo.Text>
                    <UI.Typo.Text fontSize={"$1"} fontWeight={700}>
                        {currentLocation?.longitude.toFixed(2)}
                    </UI.Typo.Text>
                </UI.XStack>
            </UI.YStack>
        </UI.Card>
    );
};

export default observer(LocationStatus);
