import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { PlusSquare } from '@tamagui/lucide-icons'
import useAppStore from '@/hooks/useAppStore';
import UI from '@/components/ui';
import React from 'react';

const DiaryActions: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();
    const [open, setOpen] = React.useState(false);

    const onPressHandle = () => {
        setOpen(true);
    }

    const onPressCancelHandle = () => {
        setOpen(false);
    }

    return (
        <>
            <UI.Fab
                position="absolute"
                theme='green'
                size="$6"
                bottom={25}
                right={25}
                icon={PlusSquare}
                onPress={onPressHandle}
            />
            <UI.Modal
                open={open}
                onOpenChange={setOpen}
                title="New note"
                onCancel={onPressCancelHandle}
            >
                <UI.Typo.Text>Вот такой вот контент внутри.</UI.Typo.Text>
            </UI.Modal>
        </>
    )
};

export default observer(DiaryActions);
