import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@/components/ui";
import useCreateForm from "@/hooks/useCreateForm";
import NewNoteFormStore from "./store/NewNoteFormStore";
import NewDiaryNoteForm from "./form/NewDiaryNoteForm";
import NoteCreatedSuccess from "./noteCreatedSuccess/NoteCreatedSuccess";

const NewDiaryNote = (() => {
    const newNoteFormStore = useCreateForm(NewNoteFormStore);

    return (
        <UI.ScreenWrapper>
            {newNoteFormStore.isSubmitted
                ? <NoteCreatedSuccess />
                : <NewDiaryNoteForm form={newNoteFormStore} />}
        </UI.ScreenWrapper>
    )
});

export default observer(NewDiaryNote);