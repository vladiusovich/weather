import React from "react";
import { ListItem, ListItemProps as TamaguiListItemProps, YGroup } from "tamagui";

export type ListItemProps = TamaguiListItemProps;

export interface ListProps {
    items: ListItemProps[];
};

const defaultProps = {
    size: "$6",
    bg: "$background0",
    // hoverTheme: true,
    // pressTheme: true,
} as const;

const List: React.FC<ListProps> = ({ items = [] }) => {
    return (
        <YGroup rounded={"$7"} gap={"$1"}>
            {items.map((i) => {
                return (
                    <YGroup.Item>
                        <ListItem {...defaultProps} {...i} />
                    </YGroup.Item>
                );
            })}
        </YGroup>
    );
};

export default List;
