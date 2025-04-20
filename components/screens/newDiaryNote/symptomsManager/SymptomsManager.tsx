import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React from 'react';
import UI from '@/components/ui';
import AddSymptomItemSheet from './addSymptomItemSheet/AddSymptomItemSheet';
import CommentField from './fileds/commentField/CommentField';
import useModalController from '@/hooks/useModalController';
import { useTranslation } from 'react-i18next';

const SymptomsManager: React.FC = () => {
    const appStore = useAppStore();
    const { open, onOpen, onClose } = useModalController();
    const { t } = useTranslation();

    const onDelete = () => {
        console.log("onDelete");
    };

    const onPressChip = () => {
        console.log("onPressChip");
    };

    const symptoms = appStore.diary.symptoms.data;

    return (
        <>
            <UI.Papper
                p='$4'
                bg={'$background02'}
                flex={1}
            >
                <UI.YStack gap={'$3'} flex={1}>
                    <UI.Typo.Text>{t('meteo.pages.newDiaryNote.symptomsList.header')}</UI.Typo.Text>
                    <UI.XStack
                        items='stretch'
                        gap='$1'
                        flexWrap='wrap'
                    >
                        {symptoms.length === 0 && (
                            <UI.Button size={'$3'} variant='outlined'>
                                {t('meteo.pages.newDiaryNote.symptomsList.buttons.useFormHistory')}
                            </UI.Button>
                        )}

                        {symptoms.map((i) => (
                            <UI.Chip
                                key={i.id}
                                label={i.name}
                                counter={2}
                            // onPress={onPressChip}
                            // onDelete={onDelete}
                            />
                        ))}
                    </UI.XStack>

                    <UI.YStack gap={'$3'}>
                        <UI.Button size={'$3'} onPress={onOpen}>
                            {t('meteo.pages.newDiaryNote.symptomsList.buttons.addNew')}
                        </UI.Button>
                    </UI.YStack>

                    <CommentField />
                </UI.YStack>

                <UI.Button size={'$5'} onPress={onOpen}>
                    {t('meteo.pages.newDiaryNote.submit')}
                </UI.Button>
            </UI.Papper>
            <AddSymptomItemSheet open={open} onClose={onClose} />
        </>
    );
};

export default observer(SymptomsManager);

