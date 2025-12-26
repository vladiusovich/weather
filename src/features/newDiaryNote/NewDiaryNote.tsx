import React from "react";
import { observer } from "mobx-react-lite";
import useCreateForm from "@hooks/useCreateForm";
import NewNoteFormStore from "./store/NewNoteFormStore";
import { useRouter } from "expo-router";
import useCallbackIf from "@hooks/useCallbackIf";
import Form from "src/core/form/index";
import SymptomsManagerForm from "./form/SymptomsManagerForm";
import UI from "@shared/components/ui";

const NewDiaryNote = (() => {
    const newNoteFormStore = useCreateForm(NewNoteFormStore);
    const router = useRouter();

    useCallbackIf(newNoteFormStore.isSubmitted, () => router.replace("/diary/success"));

    return (
        <UI.ScreenWrapper>
            <Form.Provider form={newNoteFormStore}>
                <SymptomsManagerForm />
            </Form.Provider>
        </UI.ScreenWrapper>
    );
});

export default observer(NewDiaryNote);