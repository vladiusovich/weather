import { Stack as NativeStack, router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { Settings } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";

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
                animation: "simple_push",
                title: "Weather app",
                // headerShown: false,
                headerRight: () => (
                    <Pressable hitSlop={10} onPress={() => router.push("/settings")}>
                        <Settings size={20} />
                    </Pressable>
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
