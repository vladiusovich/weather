import UI from '@/components/ui';
import { Symptom } from '@/types/diary/DiaryHistoryItem';
import { styled, View } from '@tamagui/core';
import React from 'react';

export const RoundedSquare = styled(View, {
    backgroundColor: '$background04',
    paddingBlock: 5,
    paddingStart: 10,
    paddingEnd: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
});

export const RoundedSquareValue = styled(View, {
    backgroundColor: '$red9',
    minW: '$1',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
})

interface SymptomProps {
    data: Symptom;
}

const SymptomItem: React.FC<SymptomProps> = ({
    data,
}) => {
    return (
        <RoundedSquare>
            <UI.XStack
                gap='$2'
                items={'baseline'}
            >
                <UI.Typo.Text fontSize={'$2'}>
                    {data.name}
                </UI.Typo.Text>
                <RoundedSquareValue justify={'center'} items={'center'}>
                    <UI.Typo.Text fontSize={'$2'}>
                        {data.strengtOfPain}
                    </UI.Typo.Text>
                </RoundedSquareValue>
            </UI.XStack>
        </RoundedSquare>
    );
};

export default SymptomItem;
