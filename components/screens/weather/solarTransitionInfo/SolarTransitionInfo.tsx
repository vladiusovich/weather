import { observer } from "mobx-react-lite";
import useAppStore from "@/hooks/useAppStore";
import Format from "@/components/common/format";
import UI from "@/components/ui";
import { Sunrise, Sunset } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";

const SolarTransitionInfo: React.FC = () => {
    const appStore = useAppStore();
    const router = useRouter();

    const onPress = () => {
        router.push("/solarTransition");
    };

    const daily = appStore.weather.weatherData.daily;
    return (
        <UI.YStack
            paddingInline={"$1"}
            gap={"$1"}
            onPress={onPress}
        >
            <UI.XStack gap={"$2"} items={"center"}>
                <Sunrise size={13} />
                <Format.Date fontSize={"$1"} variant='time' value={daily[0]?.sunrise as string ?? ""} />
            </UI.XStack>

            <UI.XStack gap={"$2"} items={"center"}>
                <Sunset size={13} />
                <Format.Date fontSize={"$1"} variant='time' value={daily[0]?.sunset as string ?? ""} />
            </UI.XStack>
        </UI.YStack>
    );
};

export default observer(SolarTransitionInfo);
