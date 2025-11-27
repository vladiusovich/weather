import React from "react";
import { Slider as SliderComponent, SliderProps } from "tamagui";

const Slider: React.FC<SliderProps> = (props) => (
    <SliderComponent {...props}>
        <SliderComponent.Track>
            <SliderComponent.TrackActive />
        </SliderComponent.Track>
        <SliderComponent.Thumb circular index={0} />
    </SliderComponent>
);

export default Slider;
