import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@/components/ui";
import Typography from "./typography/Typography";
import Table from "./table/Table";
import { ScrollView } from "tamagui";
import Loaders from "./loaders/Loaders";
import Cards from "./cards/Cards";
import Skeletons from "./skeletons/Skeletons";
import Selectors from "./selectors/Selectors";
import Buttons from "./buttons/Buttons";
import TextAreas from "./textAreas/TextAreas";
import Sliders from "./sliders/Sliders";
import Chips from "./chips/Chips";
import Inputs from "./inputs/Inputs";
import Datepicker from "./inputs/Datepicker";
import List from "./list/List";

const Uikit = (() => {
    return (
        <UI.ScreenWrapper Component={ScrollView}>
            <UI.YStack gap={"$4"}>
                <Buttons />
                <Chips />
                <Selectors />
                <TextAreas />
                <Inputs />
                <Datepicker />
                <Sliders />
                <Loaders />
                <Skeletons />
                <List />
                <Cards />
                <Typography />
                <Table />
            </UI.YStack>
        </UI.ScreenWrapper>
    );
});

export default observer(Uikit);