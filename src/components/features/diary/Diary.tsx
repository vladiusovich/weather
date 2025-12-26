import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RefreshControl, ScrollView } from "react-native";
import useAppStore from "@hooks/useAppStore";
import DiaryHistory from "./diaryHistory/DiaryHistory";
import NewNoteButton from "./diaryHistory/actions/NewNoteButton";
import useRefreshController from "@hooks/useRefreshController";
import { View } from "tamagui";
import NoData from "./common/noData/NoData";
import UI from "@shared/components/ui";

const Diary = () => {
    const appStore = useAppStore();

    useEffect(() => {
        appStore.diary.history.fetch();
    }, [appStore.diary.history]);

    const { refreshing, handleRefresh } = useRefreshController(() => {
        return appStore.diary.history.fetch();
    });

    const history = appStore.diary.history.data;

    if (history.length === 0) {
        return (
            <UI.ScreenWrapper>
                <View flex={1}>
                    <NoData />
                </View>
                <NewNoteButton />
            </UI.ScreenWrapper>
        );
    }

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
};

export default observer(Diary);
