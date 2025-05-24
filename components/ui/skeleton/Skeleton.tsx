import React, { useEffect, useRef } from 'react';
import { XStack } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient'
import { View, Animated, Easing } from 'react-native';

// TODO
const Skeleton: React.FC = (props) => {
    const translateX = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        const loopAnimation = () => {
            translateX.setValue(-1);
            Animated.timing(translateX, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => loopAnimation());
        };

        loopAnimation();
    }, [translateX]);

    const shimmerTranslate = translateX.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-100%', '100%'],
    });

    return (
        <XStack
            overflow="hidden"
            width="100%"
            height={80}
            bg="$background"
            rounded="$4"
            {...props}
        >
            <Animated.View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    transform: [{ translateX: shimmerTranslate }],
                    zIndex: 4
                }}
            >
                <LinearGradient
                    colors={['transparent', '$color', 'transparent']}
                    start={[0, 0]}
                    end={[1, 0]}
                    width="100%"
                    height="100%"
                />
            </Animated.View>
        </XStack>
    );
};

export default Skeleton;
