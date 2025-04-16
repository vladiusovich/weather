import { observer } from 'mobx-react-lite';
import React from 'react';
import UI from '@/components/ui';

interface Props {
}

const CommentField: React.FC<Props> = ({
}) => {
    return (
        <UI.YStack
            gap='$2'
        >
            <UI.TextArea
                placeholder='Type comment here if you want...'
                maxLength={150}
            />
        </UI.YStack>
    );
};

export default observer(CommentField);

