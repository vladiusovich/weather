import { useCallback } from "react";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import { ZoomPanState } from "../types";

type UseChartGesturesProps = {
    zoomPanState: ZoomPanState;
    setZoomPanState: (state: ZoomPanState | ((prev: ZoomPanState) => ZoomPanState)) => void;
    minScale: number;
    maxScale: number;
    enabled?: boolean;
};

export const useChartGestures = ({
    zoomPanState,
    setZoomPanState,
    minScale,
    maxScale,
    enabled = true,
}: UseChartGesturesProps) => {
    // Shared values for smooth animations
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);
    const savedScale = useSharedValue(1);

    // Update state from gesture
    const updateTranslation = useCallback((x: number, y: number) => {
        setZoomPanState(prev => ({
            ...prev,
            translateX: x,
            translateY: y,
        }));
    }, [setZoomPanState]);

    const updateScale = useCallback((newScale: number) => {
        const clampedScale = Math.max(minScale, Math.min(maxScale, newScale));
        setZoomPanState(prev => ({
            ...prev,
            scale: clampedScale,
        }));
    }, [setZoomPanState, minScale, maxScale]);

    // Pan gesture
    const panGesture = Gesture.Pan()
        .enabled(enabled)
        .onStart(() => {
            savedTranslateX.value = zoomPanState.translateX;
            savedTranslateY.value = zoomPanState.translateY;
        })
        .onUpdate((event) => {
            const newX = savedTranslateX.value + event.translationX;
            const newY = savedTranslateY.value + event.translationY;
            runOnJS(updateTranslation)(newX, newY);
        });

    // Pinch gesture for zoom
    const pinchGesture = Gesture.Pinch()
        .enabled(enabled)
        .onStart(() => {
            savedScale.value = zoomPanState.scale;
        })
        .onUpdate((event) => {
            const newScale = savedScale.value * event.scale;
            runOnJS(updateScale)(newScale);
        });

    // Combine gestures - allow simultaneous pan and pinch
    return Gesture.Simultaneous(panGesture, pinchGesture);
};