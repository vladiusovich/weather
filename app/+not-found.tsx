import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import React from "react";
import UI from "@/components/ui";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        fontSize: 16,
        textDecorationLine: "underline",
        color: "#d1d1d1ff",
    },
});

// TODO
const NotFoundScreen = () => {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <UI.Typo.Paragraph>
                    Oops! Not Found
                </UI.Typo.Paragraph>
                <Link href='/' replace style={styles.button} >
                    Go back
                </Link>
            </View>
        </>
    );
};

export default NotFoundScreen;
