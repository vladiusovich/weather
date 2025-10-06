import { useState, useCallback, useMemo } from "react";
import { ZoomPanConfig, ZoomPanState, ZoomPanActions } from "../types";

const DEFAULT_CONFIG = {
    minScale: 0.5,
    maxScale: 10,
    zoomStep: 0.2,
    panStep: 50,
};

export const useChartTransform = (config: ZoomPanConfig = {}) => {
    const { minScale, maxScale, zoomStep, panStep } = {
        ...DEFAULT_CONFIG,
        ...config,
    };

    const [state, setState] = useState<ZoomPanState>({
        scale: 1,
        translateX: 0,
        translateY: 0,
    });

    const zoomIn = useCallback(() => {
        setState(prev => ({
            ...prev,
            scale: Math.min(prev.scale + zoomStep, maxScale),
        }));
    }, [zoomStep, maxScale]);

    const zoomOut = useCallback(() => {
        setState(prev => ({
            ...prev,
            scale: Math.max(prev.scale - zoomStep, minScale),
        }));
    }, [zoomStep, minScale]);

    const panLeft = useCallback(() => {
        setState(prev => ({
            ...prev,
            translateX: prev.translateX + panStep,
        }));
    }, [panStep]);

    const panRight = useCallback(() => {
        setState(prev => ({
            ...prev,
            translateX: prev.translateX - panStep,
        }));
    }, [panStep]);

    const panUp = useCallback(() => {
        setState(prev => ({
            ...prev,
            translateY: prev.translateY + panStep,
        }));
    }, [panStep]);

    const panDown = useCallback(() => {
        setState(prev => ({
            ...prev,
            translateY: prev.translateY - panStep,
        }));
    }, [panStep]);

    const reset = useCallback(() => {
        setState({
            scale: 1,
            translateX: 0,
            translateY: 0,
        });
    }, []);

    const actions = useMemo<ZoomPanActions>(
        () => ({
            zoomIn,
            zoomOut,
            panLeft,
            panRight,
            panUp,
            panDown,
            reset,
        }),
        [zoomIn, zoomOut, panLeft, panRight, panUp, panDown, reset]
    );

    // Expose setState for gesture handler
    const config_ = useMemo(() => ({
        minScale,
        maxScale,
        zoomStep,
        panStep,
    }), [minScale, maxScale, zoomStep, panStep]);

    return {
        state,
        actions,
        setState,
        config: config_,
    };
};

