import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React from 'react';
import UI from '@/components/ui';
import AddSymptomItemSheet from './addSymptomItemSheet/AddSymptomItemSheet';
import CommentField from './fileds/commentField/CommentField';
import useModalController from '@/hooks/useModalController';

const SymptomsManager: React.FC = () => {
    const appStore = useAppStore();
    const { open, onOpen, onClose } = useModalController();

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
                    <UI.Typo.Text>Symptoms</UI.Typo.Text>
                    <UI.XStack
                        items='stretch'
                        gap='$1'
                        flexWrap='wrap'
                    // minW={80}
                    >
                        {symptoms.length === 0 && (
                            <UI.Button size={'$3'} variant='outlined'>
                                Use from prev note
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
                            Add symptom
                        </UI.Button>
                    </UI.YStack>

                    <CommentField />
                </UI.YStack>

                <UI.Button size={'$5'} onPress={onOpen}>
                    Create note
                </UI.Button>
            </UI.Papper>
            <AddSymptomItemSheet open={open} onClose={onClose} />
        </>
    );
};

export default observer(SymptomsManager);

