import * as d3 from "d3";
import { XScale, YScale, ScaleKind } from "./types";
import { CHART_CONSTANTS } from "./constants";

/**
 * Type guard to check if scale is a time scale
 */
export const isTimeScale = (scale: XScale): scale is d3.ScaleTime<number, number> => {
    const domain = scale.domain();
    return domain.length > 0 && domain[0] instanceof Date;
};

/**
 * Safely compute extent with fallback for empty arrays
 */
export const safeExtent1D = (
    arr: number[],
    fallback: [number, number] = [0, 1]
): [number, number] => {
    if (!arr.length) return fallback;

    const [mn, mx] = d3.extent(arr) as [number | undefined, number | undefined];

    if (mn === undefined || mx === undefined) return fallback;

    return mn === mx ? [mn, mn + 1] : [mn, mx];
};

/**
 * Calculate domain with padding
 */
export const calculateDomainWithPadding = (
    values: number[],
    paddingRatio: number = CHART_CONSTANTS.Y_DOMAIN_PADDING_RATIO
): [number, number] => {
    const [min, max] = safeExtent1D(values);
    const padding = (max - min || 1) * paddingRatio;
    return [min - padding, max + padding];
};

/**
 * Get default formatter based on scale type
 */
export const getDefaultAxisFormatter = (
    isTime: boolean,
    customFormat?: (v: any) => string
): (v: any) => string => {
    if (customFormat) return customFormat;
    return isTime ? d3.timeFormat("%d.%m") : (v: number) => String(v);
};

/**
 * Get default Y-axis formatter
 */
export const getDefaultYFormatter = (
    customFormat?: (v: number) => string
): (v: number) => string => {
    if (customFormat) return customFormat;
    return (v: number) => Number.isInteger(v) ? String(v) : v.toFixed(2);
};

/**
 * Create X scale based on kind
 */
export const createXScale = (
    kind: ScaleKind,
    domain: [number | Date, number | Date],
    rangeWidth: number
): XScale => {
    if (kind === "time") {
        const timeDomain = domain.map(v =>
            v instanceof Date ? v : new Date(v)
        ) as [Date, Date];
        return d3.scaleTime().domain(timeDomain).range([0, rangeWidth]);
    }
    return d3.scaleLinear()
        .domain(domain as [number, number])
        .range([0, rangeWidth]);
};

/**
 * Create Y scales for multiple axes
 */
export const createYScales = (
    yDomains: Record<string, [number, number]>,
    rangeHeight: number,
    nice: boolean = true
): Record<string, YScale> => {
    const scales: Record<string, YScale> = {};

    Object.entries(yDomains).forEach(([id, domain]) => {
        const scale = d3.scaleLinear()
            .domain(domain)
            .range([rangeHeight, 0]);
        scales[id] = nice ? scale.nice() : scale;
    });

    return scales;
};

/**
 * Extract numeric values from points for extent calculation
 */
export const extractXValues = (
    points: { x: number | Date; y: number }[],
    kind: ScaleKind
): number[] => {
    return points.map(p =>
        kind === "time" ? +new Date(p.x as any) : (p.x as number)
    );
};

/**
 * Group Y values by axis ID
 */
export const groupYValuesByAxis = (
    dataSets: { data: { y: number }[]; yAxisId?: string }[]
): Record<string, number[]> => {
    const groups: Record<string, number[]> = {};

    dataSets.forEach(dataSet => {
        const id = dataSet.yAxisId ?? "y0";
        if (!groups[id]) groups[id] = [];
        dataSet.data.forEach(point => groups[id].push(point.y));
    });

    return groups;
};

/**
 * Calculate Y domains from grouped values
 */
export const calculateYDomains = (
    groups: Record<string, number[]>,
    paddingRatio?: number
): Record<string, [number, number]> => {
    const domains: Record<string, [number, number]> = {};

    Object.entries(groups).forEach(([id, values]) => {
        domains[id] = calculateDomainWithPadding(values, paddingRatio);
    });

    return domains;
};

export const calculateYAxisOffsets = (axisCount: number): number[] => {
    const range = Array.from({ length: axisCount });

    const r = range.map((_a, i) => {
        const v = i + 1;
        return v > 1
            ? (v - 1) * CHART_CONSTANTS.AXIS_OFFSET_WIDTH
            : 0;
    });

    return r;
};

export const calculateOffsets = (offsets: number[]): number => {
    return offsets.reduce((value, acc) => acc + value, 0);
};
