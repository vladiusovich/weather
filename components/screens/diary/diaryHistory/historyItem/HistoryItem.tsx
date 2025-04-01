import Format from '@/components/common/format';
import UI from '@/components/ui';
import { DiaryHistoryItem } from '@/types/diary/DiaryHistoryItem';
import { observer } from 'mobx-react-lite';
import React from 'react';
import SymptomItems from './symptomItems/SymptomItems';
import Comment from './commet/Comment';

interface HistoryItemProps {
    data: DiaryHistoryItem;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
    data,
}) => {
    const symptoms = data.symptoms;

    return (
        <UI.Card
            padding='$4'
            backgroundColor={'$background02'}
        >
            <UI.Card.Header size={'$0.5'}>
                <UI.XStack gap={'$2'} items={'center'}>
                    <Format.Date value={data.date} variant='date' />
                </UI.XStack>
            </UI.Card.Header>
            <UI.Separator marginBlock={'$2'} />

            <UI.YStack gap={'$2'}>
                <SymptomItems data={symptoms} />
                <Comment data={data?.comment} />
            </UI.YStack>
        </UI.Card>
    );
};

export default observer(HistoryItem);
