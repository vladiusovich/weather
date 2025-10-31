import { observer } from "mobx-react-lite";
import useAppStore from "@/hooks/useAppStore";
import Format from "@/components/common/format";
import UI from "@/components/ui";
import { Moon, Sun } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";

const SolarTransitionCard: React.FC = () => {
    const appStore = useAppStore();
    const router = useRouter();

    const onPress = () => {
        router.push("/solarTransition");
    };

    const daily = appStore.weather.weatherData.daily;
    return (
        <UI.Paper flex={1}>
            <UI.YStack
                gap={"$1"}
                onPress={onPress}
                flex={1}
                justify={"space-around"}
                items={"center"}
            >
                <UI.XStack gap={"$2"} items={"center"}>
                    <Sun size={"$2"} strokeWidth={1} />
                    <Format.Date fontSize={"$1"} variant='time' value={daily[0]?.sunrise as string ?? ""} />
                </UI.XStack>

                <UI.XStack gap={"$2"} items={"center"}>
                    <Moon size={"$2"} strokeWidth={1} />
                    <Format.Date fontSize={"$1"} variant='time' value={daily[0]?.sunset as string ?? ""} />
                </UI.XStack>
            </UI.YStack>
        </UI.Paper>
    );
};

export default observer(SolarTransitionCard);
