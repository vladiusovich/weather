import NoteCreatedSuccess from "@features/newDiaryNote/noteCreatedSuccess/NoteCreatedSuccess";
import { Stack } from "expo-router";

const SuccessDiaryCreationScreen = () => {
    return (
        <>
            <Stack.Screen options={{
                headerShown: false
            }} />
            <NoteCreatedSuccess />
        </>
    );
};

export default SuccessDiaryCreationScreen;
