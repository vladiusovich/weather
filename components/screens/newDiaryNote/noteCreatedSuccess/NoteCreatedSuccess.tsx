import React from 'react';
import { observer } from 'mobx-react-lite';
import UI from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { Smile } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

const NoteCreatedSuccess = (() => {
    const { t } = useTranslation();
    const router = useRouter();

    const onPress = () => {
        router.replace('/diary');
    }

    return (
        <UI.Papper
            p='$4'
            bg={'$background02'}
            flex={1}
        >
            <UI.YStack flex={1}>
                <UI.YStack
                    justify='center'
                    items='center'
                    gap='$4'
                    flex={1}
                >
                    <Smile size={80} color='$green10' />
                    <UI.Typo.H5>
                        {t('meteo.pages.newDiaryNote.createdSuccess.header')}
                    </UI.Typo.H5>
                </UI.YStack>
                <UI.Button size={'$5'} onPress={onPress}>
                    {t('meteo.pages.newDiaryNote.createdSuccess.submit')}
                </UI.Button>
            </UI.YStack>
        </UI.Papper>
    )
});

export default observer(NoteCreatedSuccess);