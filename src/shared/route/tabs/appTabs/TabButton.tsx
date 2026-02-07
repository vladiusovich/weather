
import { Pressable } from "react-native";
import { useTheme, YStack } from "tamagui";

interface TabButtonProps {
    route: any;
    isFocused: boolean;
    options: any;
    onPress: () => void;
    onLongPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
    route,
    isFocused,
    options,
    onPress,
    onLongPress,
}) => {
    const theme = useTheme();

    const IconComponent = options.tabBarIcon;

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            hitSlop={25}
        >
            <YStack
                flex={1}
                items="center"
                justify="center"
            >
                {IconComponent && (
                    <IconComponent
                        color={isFocused ? theme.accent7 : theme.gray11?.val ?? theme.color.val}
                    />
                )}
            </YStack>
        </Pressable >
    );
};
export default TabButton;
