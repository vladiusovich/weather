/* eslint-disable max-len */
import React from 'react';
import { DataSet } from './types';
import { Line } from './Line';

export const Lines: React.FC<{ dataSet: DataSet[] }> = ({ dataSet }) => (
    <>
        {/* key={s.id} */}
        {dataSet.map((s, i) => (
            <Line key={i} {...s} />
        ))}
    </>
);
