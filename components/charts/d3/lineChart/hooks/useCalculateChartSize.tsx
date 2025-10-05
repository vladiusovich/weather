import { useState } from 'react';
import { LayoutRectangle } from 'react-native';

export const useCalculateChartSize = () => {
    const [chartWidth, setChartWidth] = useState(0);
    const [isReady, setIsReady] = useState(false);

    return {
        onLayout: (layout: LayoutRectangle) => {
            const { width, x } = layout;
            setChartWidth(width - 2 * x);
            setIsReady(true);
        },
        chartWidth,
        isReady
    }
};

export default useCalculateChartSize;
