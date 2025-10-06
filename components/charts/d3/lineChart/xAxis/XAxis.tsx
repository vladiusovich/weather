import React, { useMemo } from "react";
import useChart from "../context/useChart";
import { G, Line as SvgLine, Text as SvgText } from "react-native-svg";
import { AxisProps } from "../types";
import { isTimeScale, getDefaultAxisFormatter } from "../utils";
import { CHART_CONSTANTS } from "../constants";

const XAxis: React.FC<AxisProps> = ({
    ticks = CHART_CONSTANTS.DEFAULT_TICKS,
    format,
    showTicks = true,
    showLine = true,
}) => {
    const { xScale, innerH, theme } = useChart();

    const isTime = useMemo(() => isTimeScale(xScale), [xScale]);

    const values = useMemo(() => {
        if ("ticks" in xScale && typeof xScale.ticks === "function") {
            return xScale.ticks(ticks);
        }
        return [];
    }, [xScale, ticks]);

    const formatter = useMemo(() => getDefaultAxisFormatter(isTime, format), [isTime, format]);

    const xRange = useMemo(() => {
        const range = xScale.range() as [number, number];
        return range[1];
    }, [xScale]);

    const tickData = useMemo(() =>
        values.map((t, i) => ({
            key: `xtick-${i}`,
            value: t,
            x: (xScale as any)(t) as number,
            label: formatter(t),
        })), [values, xScale, formatter]
    );

    return (
        <>
            {showLine && (
                <SvgLine
                    x1={0}
                    x2={xRange}
                    y1={innerH}
                    y2={innerH}
                    stroke={theme.axisColor}
                    strokeWidth={CHART_CONSTANTS.AXIS_STROKE_WIDTH}
                />
            )}
            {tickData.map(({ key, x, label }) => (
                <G key={key} x={x} y={innerH}>
                    {showTicks && (
                        <SvgLine
                            x1={0}
                            x2={0}
                            y1={0}
                            y2={CHART_CONSTANTS.TICK_LENGTH}
                            stroke={theme.axisColor}
                            strokeWidth={CHART_CONSTANTS.AXIS_STROKE_WIDTH}
                        />
                    )}
                    <SvgText
                        y={16}
                        fontSize={CHART_CONSTANTS.FONT_SIZE}
                        fill={theme.labelColor}
                        textAnchor="middle"
                    >
                        {label}
                    </SvgText>
                </G>
            ))}
        </>
    );
};

export default XAxis;