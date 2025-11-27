import React from "react";
import { observer } from "mobx-react-lite";
import UI, { Column } from "@components/ui";
import UiSection from "../UiSection";
import Format from "@components/common/format";

type RenderType = { time: string; sunrise: string; sunset: string; daylight: string; };

const Table: React.FC = () => {
    const now = new Date().toISOString();

    const columns: Column<RenderType>[] = [
        {
            key: "time",
            title: "Date",
            render: (i => <Format.Date value={i.time} variant='date' />)
        },
        {
            key: "sunrise",
            title: "Sunrise",
            render: (i => <Format.Date value={i.sunrise} variant='time' />)
        },
        {
            key: "sunset",
            title: "Sunset",
            render: (i => <Format.Date value={i.sunset} variant='time' />)
        },
        {
            key: "daylight",
            title: "Daylight",
        },
    ];

    const data = Array.from({ length: 5 }).map((i) => ({
        time: now,
        sunset: now,
        sunrise: now,
        daylight: "12.55",
    }));

    return (
        <UiSection header="Table" >
            <UI.Table data={data} columns={columns} />
        </UiSection>
    );
};

export default observer(Table);