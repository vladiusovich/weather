import { observer } from 'mobx-react-lite';
import React from 'react';
import UI from '@/components/ui';
import Form from '@/form';

const DatePeriod: React.FC = () => {
    return (
        <UI.Card
            padding='$4'
            bg={'$background02'}
        >
            <UI.Card.Header size={'$0.5'}>
                <UI.YStack gap={'$2'} items='flex-start'>
                    <Form.Field
                        name='date'
                        component={UI.DatePicker}
                    />
                    {/* <UI.DatePicker value={value} onChange={onDatesChange} /> */}
                </UI.YStack>
            </UI.Card.Header>

            <UI.YStack gap={'$2'}>
            </UI.YStack>
        </UI.Card>
    );
};

export default observer(DatePeriod);

