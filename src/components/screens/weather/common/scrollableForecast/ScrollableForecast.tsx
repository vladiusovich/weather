import UI from "@components/ui";
import { observer } from "mobx-react-lite";
import React from "react";

interface ScrollableForecastProps {
    header: string | React.ReactNode;
    headerIcon?: React.ReactNode;
    children: React.ReactNode[];
    isLoading?: boolean;
}

const ScrollableForecast: React.FC<ScrollableForecastProps> = ({
    header,
    headerIcon,
    children,
    isLoading = false,
}) => {
    return (
        <UI.Paper>
            <UI.Loader isLoading={isLoading} />
            {!isLoading && (
                <>
                    <UI.Card.Header size={"$0.5"}>
                        <UI.XStack gap={"$2"} items={"center"}>
                            {headerIcon}
                            <UI.Typo.Text>
                                {header}
                            </UI.Typo.Text>
                        </UI.XStack>
                    </UI.Card.Header>

                    <UI.Separator marginBlock={"$2"} />

                    <UI.ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <UI.XStack
                            items='stretch'
                            justify='space-between'
                            gap='$2'
                            flex={1}
                        >
                            {children}
                        </UI.XStack>
                    </UI.ScrollView>
                </>
            )}
        </UI.Paper>
    );
};

export default observer(ScrollableForecast);
