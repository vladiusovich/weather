import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RefreshControl, ScrollView } from 'react-native';
import useAppStore from '@/hooks/useAppStore';
import DiaryHistory from './diaryHistory/DiaryHistory';
import NewNoteButton from './diaryHistory/actions/NewNoteButton';

const Diary = observer(() => {
    const appStore = useAppStore();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setRefreshing(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
    }, []);

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <DiaryHistory />
            </ScrollView>
            <NewNoteButton />
        </>
    );
});

export default Diary;