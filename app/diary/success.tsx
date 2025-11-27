import { Stack } from "expo-router";
import NoteCreatedSuccess from "@/components/screens/newDiaryNote/noteCreatedSuccess/NoteCreatedSuccess";

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
