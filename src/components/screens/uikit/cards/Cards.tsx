import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@components/ui";
import UiSection from "../UiSection";

const Cards: React.FC = () => {
    return (
        <UiSection header="Cards" >
            <UI.Card padding="$4">
                <UI.Card.Header padded>
                    <UI.Typo.H6>Sony A7IV</UI.Typo.H6>
                    <UI.Typo.Text color={"$color11"} >Now available</UI.Typo.Text>
                </UI.Card.Header>
                <UI.Card.Footer padded>
                    <UI.Button>Purchase</UI.Button>
                </UI.Card.Footer>
            </UI.Card>
        </UiSection>
    );
};

export default observer(Cards);