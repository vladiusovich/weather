import { Stack as NativeStack, router } from "expo-router";
import React from "react";
import { Pressable, PressableProps } from "react-native";
import { Settings, CodeSquare } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";
import UI from "../ui";

const PressableHeaderIcon: React.FC<PressableProps> = ({ children, ...rest }) => {
    return (
        <Pressable
            hitSlop={8}
            {...rest}
        >
            {children}
        </Pressable>
    );
};

interface StackProps {
    children?: React.ReactNode;
}

const Stack: React.FC<StackProps> = ({
    children,
}) => {
    const theme = useTheme();

    return (
        <NativeStack
            screenOptions={{
                animation: "none",
                title: "Weather app",
                // headerShown: false,
                headerRight: () => (
                    <UI.XStack gap="$4">
                        <PressableHeaderIcon onPress={() => router.push("/dev")}>
                            <CodeSquare size={20} />
                        </PressableHeaderIcon>
                        <PressableHeaderIcon onPress={() => router.push("/settings")}>
                            <Settings hitSlop={10} size={20} />
                        </PressableHeaderIcon>
                    </UI.XStack>
                ),
                headerStyle: {
                    // backgroundColor: theme.color2.val,
                    backgroundColor: theme.background.val,
                },
                headerTintColor: theme.color.val,
                contentStyle: {
                    backgroundColor: theme.background.val,

                },
                // headerShadowVisible: true,
                headerShadowVisible: false,
            }}
        >
            {children}
        </NativeStack>
    );
};


export default Stack;
