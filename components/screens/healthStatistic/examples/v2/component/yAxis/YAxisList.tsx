import React from 'react';
import { CHART_CONSTANTS } from '../constants';
import YAxis from './YAxis';
import useChart from '../hooks/useChart';

export const YAxisList: React.FC<{ axisIds: string[] }> = ({
    axisIds,
}) => {
    const { yAxisOffsets } = useChart();

    return (
        <>
            {axisIds.map((id, i) => (
                <YAxis
                    key={id}
                    axisId={id}
                    ticks={CHART_CONSTANTS.DEFAULT_TICKS}
                    side={'left'}
                    offset={yAxisOffsets[i]}
                />
            ))}
        </>
    );
};

export default YAxisList;