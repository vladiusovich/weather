export const CHART_CONSTANTS = {
    // Domain padding
    Y_DOMAIN_PADDING_RATIO: 0.05,

    // Axis dimensions
    AXIS_OFFSET_WIDTH: 28,
    TICK_LENGTH: 6,
    LABEL_OFFSET: 8,

    // Text sizes
    FONT_SIZE: 10,

    // Default ticks
    DEFAULT_TICKS: 5,

    // Stroke widths
    DEFAULT_STROKE_WIDTH: 1,
    AXIS_STROKE_WIDTH: 1,
    GRID_STROKE_WIDTH: 1,
} as const;

// Default padding for chart
export const DEFAULT_PADDING = {
    top: 0,
    right: 18,
    bottom: 24,
    left: 24,
} as const;

// Default theme
export const DEFAULT_THEME = {
    axisColor: "#bcbcbc8e",
    gridColor: "#ffffff21",
    lineColor: "#2563eb",
    labelColor: "#c5c5c5ff",
} as const;