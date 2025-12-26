import { Stack as NativeStack, router } from "expo-router";
import React from "react";
import { Pressable, PressableProps } from "react-native";
import { Settings, CodeSquare } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";
import UI from "src/shared/components/ui";

const PressableHeaderIcon: React.FC<PressableProps> = ({ children, ...props }) => {
    return (
        <Pressable
            hitSlop={8}
            {...props}
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
                            <CodeSquare size={24} />
                        </PressableHeaderIcon>
                        <PressableHeaderIcon onPress={() => router.push("/settings")}>
                            <Settings size={24} />
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
