import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, LayoutChangeEvent } from "react-native";
import { Stack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

const Skeleton: React.FC<{ height?: number }> = ({ height = 80 }) => {
    const [w, setW] = useState(0);
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(anim, {
                toValue: 1,
                duration: 1400,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        loop.start();
        return () => loop.stop();
    }, [anim]);

    const onLayout = (e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width);

    const bandWidth = Math.max(60, Math.round(w * 0.55));

    const translateX = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [-bandWidth, w + bandWidth], // reset outside visible area
    });

    return (
        <Stack
            onLayout={onLayout}
            width="100%"
            height={height}
            bg="$background02"
            rounded="$4"
            overflow="hidden"
            position="relative"
        >
            {w > 0 && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        { transform: [{ translateX, }] },
                    ]}
                >
                    <LinearGradient
                        colors={["transparent", "$background06", "transparent"]}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={{
                            height: "100%",
                            width: bandWidth,
                        }}
                    />
                </Animated.View>
            )}
        </Stack>
    );
};

export default Skeleton;
