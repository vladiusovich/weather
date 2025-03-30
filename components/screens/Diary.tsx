import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RefreshControl, ScrollView } from 'react-native';
import useAppStore from '@/hooks/useAppStore';
import UI from '@/components/ui';
import DiiaryHistory from '../diary/diiaryHistory/DiiaryHistory';

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

    const isLoading = true;

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {/* {isLoading && (<UI.Loader />)} */}
            <DiiaryHistory />
        </ScrollView>
    );
});

export default Diary;