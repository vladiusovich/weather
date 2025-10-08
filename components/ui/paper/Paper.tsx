import { styled, View } from "tamagui";

const radius = 15;

const Papper = styled(View, {
    p: "$4",
    bg: "$color3",
    borderTopStartRadius: radius,
    borderTopEndRadius: radius,
    borderBottomStartRadius: radius,
    borderBottomEndRadius: radius,
});

export default Papper;
