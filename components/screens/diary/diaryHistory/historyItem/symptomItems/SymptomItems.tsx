import UI from '@/components/ui';
import { Symptom } from '@/types/diary/DiaryHistoryItem';
import React from 'react';
import SymptomItem from './SymptomItem';
import FeelingGood from './FeelingGood';

interface SymptomItemsProps {
    data: Symptom[];
}

const SymptomItems: React.FC<SymptomItemsProps> = ({
    data,
}) => {
    if (data.length === 0) {
        return <FeelingGood />;
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
