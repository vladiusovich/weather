import NewDiaryNote from '@/components/screens/newDiaryNote/NewDiaryNote';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

const NewDiaryNoteScreen = () => {
    const { t } = useTranslation();
    return (
        <>
            <Stack.Screen
                options={{
                    title: t('meteo.pages.newDiaryNote.header'),
                }}
            />
            <NewDiaryNote />
        </>
    );
};

export default NewDiaryNoteScreen;
