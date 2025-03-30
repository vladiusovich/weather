import UI from '@/components/ui';
import { Symptom } from '@/types/diary/DiaryHistoryItem';
import React from 'react';
import SymptomItem from './SymptomItem';
import { Smile } from '@tamagui/lucide-icons';

interface SymptomItemsProps {
    data: Symptom[];
}

const SymptomItems: React.FC<SymptomItemsProps> = ({
    data,
}) => {
    const noData = data.length === 0;

    if (noData) {
        return (
            <UI.XStack
                items='stretch'
                gap='$2'
            >
                <UI.Typo.Text fontSize={'$2'}>
                    {'No symptoms'}
                </UI.Typo.Text>
                <Smile size={16} />
            </UI.XStack>
        );
    }

    return (
        <UI.XStack
            items='stretch'
            gap='$1'
        >
            {data.map((i) => <SymptomItem key={i.id} data={i} />)}
        </UI.XStack>
    );
};

export default SymptomItems;
