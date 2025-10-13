import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@/components/ui";
import UiSection from "../UiSection";
import useModalController from "@/hooks/useModalController";

const Buttons: React.FC = () => {
    const { open, onOpen, onClose } = useModalController();
    const { open: openModal, onOpen: onOpenModal, onClose: onCloseModal } = useModalController();

    return (
        <UiSection header="Buttons">
            <UI.YStack gap="$2">
                <UI.Button onPress={onOpen}>
                    Sheet
                </UI.Button>

                <UI.Button onPress={onOpenModal}>
                    Modal
                </UI.Button>

                <UI.Button loading>
                    Loading
                </UI.Button>

                <UI.Button size={"$6"}>Normal Button</UI.Button>
                <UI.Button size={"$5"} circular>A</UI.Button>
            </UI.YStack>

            <UI.SheetView
                open={open}
                onClose={onClose}
            >
                <UI.Typo.H5>Sheet view</UI.Typo.H5>
            </UI.SheetView>

            <UI.Modal
                open={openModal}
                title={"Modal"}
                description="Some description"
                onConfirm={onCloseModal}
                onCancel={onCloseModal}
            >
                <UI.Typo.H5>Modal view test</UI.Typo.H5>
            </UI.Modal>
        </UiSection>
    );
};

export default observer(Buttons);