import NewDiaryNote from '@/components/screens/newDiaryNote/NewDiaryNote';
import { Stack } from 'expo-router';

const NewDiaryNoteScreen = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'New note',
                }}
            />
            <NewDiaryNote />
        </>
    );
};

export default NewDiaryNoteScreen;
