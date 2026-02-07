import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme, XStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabButton from "./TabButton";

export const AppTabs: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <XStack
            position="fixed"
            b={insets.bottom + 5}
            background={"transparent"}
            bg={"transparent"}
            borderColor={"transparent"}
            borderTopWidth={0}
            paddingInline={25}
        >
            <XStack
                justify={"center"}
                bg={theme.background02}
                borderWidth={1}
                borderColor={theme.borderColor}
                rounded={999}
                width={"100%"}
                paddingBlock={25}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <TabButton
                            key={route.key}
                            route={route}
                            isFocused={isFocused}
                            options={options}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        />
                    );
                })}
            </XStack>

        </XStack>
    );
};

export default AppTabs;
