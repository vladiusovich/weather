import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Stack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

const Skeleton: React.FC<{ height?: number }> = ({ height = 80 }) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = () => {
            shimmerAnim.setValue(0);
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => loop());
        };

        loop();
    }, [shimmerAnim]);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 200], // можно настроить под нужную ширину
    });

    return (
        <Stack
            width="100%"
            height={height}
            bg='$background04'
            rounded="$4"
            overflow="hidden"
            position="relative"
            borderWidth={1}
            borderColor={"rgba(184, 184, 184, 0.1)"}
        >
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <LinearGradient
                    colors={["transparent", "$background04", "transparent"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </Stack>
    );
};

export default Skeleton;
