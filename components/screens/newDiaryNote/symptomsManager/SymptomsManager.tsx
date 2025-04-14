import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React, { useState } from 'react';
import UI from '@/components/ui';
import SymptomChip from '../../diary/common/symptomItems/SymptomChip';
import { Symptom } from '@/types/diary/DiaryHistoryItem';
import AddSymptomItemSheet from './addSymptomItemSheet/AddSymptomItemSheet';

const SymptomsManager: React.FC = () => {
    const appStore = useAppStore();
    const [value, setValue] = useState<Symptom[]>([]);
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <UI.Papper
                p='$4'
                bg={'$background02'}
            >
                <UI.YStack gap={'$3'}>
                    <UI.Typo.Text>
                        Symptoms
                    </UI.Typo.Text>

                    <UI.XStack
                        items='stretch'
                        gap='$1'
                        minW={80}
                    >
                        {value.length === 0 && (
                            <UI.Button size={'$3'} variant='outlined'>
                                Use previous list
                            </UI.Button>
                        )}

                        {value.map((i) => <SymptomChip key={i.id} data={i} />)}
                    </UI.XStack>

                    <UI.YStack gap={'$3'}>
                        <UI.Button size={'$3'} onPress={onOpen}>
                            Add
                        </UI.Button>
                    </UI.YStack>
                </UI.YStack>
            </UI.Papper>
            <AddSymptomItemSheet open={open} onClose={onClose} />
        </>
    );
};

export default observer(SymptomsManager);

