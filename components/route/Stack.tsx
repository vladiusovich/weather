import { Stack as NativeStack } from 'expo-router';
import React from 'react';
import { useTheme } from 'tamagui';

// type NativeStackProps = typeof NativeStack;

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
                animation: 'fade',
                headerStyle: {
                    backgroundColor: theme.black4.val,
                },
                headerTintColor: theme.color.val,
                contentStyle: {
                    backgroundColor: theme.black4.val,
                }
            }}
        >
            {children}
        </NativeStack>
    );
};


export default Stack;
