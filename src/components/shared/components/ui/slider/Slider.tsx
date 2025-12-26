import React from "react";
import { ComposedGesture, GestureDetector, GestureType } from "react-native-gesture-handler";
import { Slider as SliderComponent, SliderProps } from "tamagui";

export interface ExSliderProps extends SliderProps {
    gesture?: ComposedGesture | GestureType;
};

const Slider: React.FC<ExSliderProps> = (props) => {
    const slider = (
        <SliderComponent {...props}>
            <SliderComponent.Track>
                <SliderComponent.TrackActive />
            </SliderComponent.Track>
            <SliderComponent.Thumb circular index={0} />
        </SliderComponent>
    );

    if (props?.gesture) {
        return (
            <GestureDetector gesture={props?.gesture}>
                {slider}
            </GestureDetector>
        );
    }

    return slider;
};

export default Slider;
