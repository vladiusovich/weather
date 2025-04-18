import UI from '@/components/ui';
import { Symptom } from '@/types/diary/DiaryHistoryItem';
import React from 'react';

interface SymptomProps {
    data: Symptom;
}

const SymptomChip: React.FC<SymptomProps> = ({
    data,
}) => {
    return (
        <UI.Chip
            label={data.name}
            counter={data.strengtOfPain}
        />
    );
};

export default SymptomChip;
