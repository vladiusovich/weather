import React from 'react';
import { Line } from './Line';
import { DataSet } from '../types';

export const Lines: React.FC<{ dataSet: DataSet[] }> = ({ dataSet }) => (
    <>
        {dataSet.map((s, i) => (
            <Line key={s.id ?? `line-${i}`} {...s} />
        ))}
    </>
);

