import React from 'react';
import { CHART_CONSTANTS } from '../constants';
import YAxis from './YAxis';

const multyplyAxis = (i: number) => {
    const v = i + 1;
    return v > 1
        ? (v - 1) * CHART_CONSTANTS.AXIS_OFFSET_WIDTH
        : 0;
}
export const YAxisList: React.FC<{ axisIds: string[] }> = ({
    axisIds,
}) => {

    return (
        <>
            {axisIds.map((id, idx) => (
                <YAxis
                    key={id}
                    axisId={id}
                    ticks={CHART_CONSTANTS.DEFAULT_TICKS}
                    side={'left'}
                    offset={multyplyAxis(idx)}
                />
            ))}
        </>
    );
};

export default YAxisList;