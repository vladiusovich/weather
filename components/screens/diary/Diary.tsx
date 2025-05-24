import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RefreshControl, ScrollView } from 'react-native';
import useAppStore from '@/hooks/useAppStore';
import DiaryHistory from './diaryHistory/DiaryHistory';
import NewNoteButton from './diaryHistory/actions/NewNoteButton';
import UI from '@/components/ui';
import useRefreshController from '@/hooks/useRefreshController';

const Diary = observer(() => {
    const appStore = useAppStore();

    useEffect(() => {
        appStore.diary.history.fetch();
    }, [appStore.diary.history]);

    const { refreshing, handleRefresh } = useRefreshController(() => {
        return appStore.diary.history.fetch();
    });

    return (
        <UI.ScreenWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <DiaryHistory />
            </ScrollView>
            <NewNoteButton />
        </UI.ScreenWrapper>
    );
});

export default Diary;