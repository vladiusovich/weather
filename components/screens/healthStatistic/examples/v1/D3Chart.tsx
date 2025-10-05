/* eslint-disable @typescript-eslint/no-use-before-define */
import { curveBasis, line, scaleLinear, scaleTime } from 'd3';
import React from 'react';
import { Dimensions } from 'react-native';

import { parse } from 'react-native-redash';

import Animated from 'react-native-reanimated';
import {
    animatedData,
    animatedData2,
    animatedData3,
    DataPoint,
    originalData,
} from './Data';
import LineChart, { GraphData } from './LineChart';

const { width } = Dimensions.get('screen');

const CARD_WIDTH = width - 20;
const GRAPH_WIDTH = CARD_WIDTH - 60;
const GRAPH_HEIGHT = 200;


const makeGraph = (data: DataPoint[]) => {
    const max = Math.max(...data.map(val => val.value));
    const min = Math.min(...data.map(val => val.value));
    const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);

    const x = scaleTime()
        .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
        .range([10, GRAPH_WIDTH - 10]);

    const curvedLine = line<DataPoint>()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.value))
        .curve(curveBasis)(data);

    return {
        max,
        min,
        curve: parse(curvedLine!),
        mostRecent: data[data.length - 1].value,
    };
};

const graphData: GraphData[] = [
    makeGraph(originalData),
    makeGraph(animatedData),
    makeGraph(animatedData2),
    makeGraph(animatedData3),
];

const D3Chart = () => {
    return (
        <Animated.View>
            <LineChart
                title='Facebook'
                height={GRAPH_HEIGHT}
                width={GRAPH_WIDTH}
                data={graphData}
                bottomPadding={20}
                leftPadding={0}
            />
        </Animated.View>
    );
};


export default D3Chart;