import {
    ListItemFrame,
    ListItemText,
    ListItemTitle,
    ListItemSubtitle,
    styled,
    useListItem,
} from "tamagui";

// TODO: I do not understand how to customize this component
const CustomListItemFrame = styled(ListItemFrame, {
    // size: "$6",
    bg: "$background0",
    // hoverTheme: true,
    // pressTheme: true,
});

const CustomListItemTitle = styled(ListItemTitle, {
    // size: "$6",
    // fontSize: "$3"
});

const CustomListItemSubtitle = styled(ListItemSubtitle, {
    // fontSize: "$3",
    // size: "$6",
});

const CustomListItemText = styled(ListItemText, {
    // size: "$6",
    // fontSize: "$3"
    // color: "red",
});

// TODO
export const StyledListItem = CustomListItemFrame.styleable((propsIn, ref) => {
    const { props } = useListItem(propsIn, {
        Title: CustomListItemTitle,
        Text: CustomListItemText,
        Subtitle: CustomListItemSubtitle,
    });

    return <CustomListItemFrame {...props} ref={ref} />;
});