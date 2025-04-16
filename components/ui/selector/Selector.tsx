import React from 'react';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import type { SelectProps } from 'tamagui';
import {
    Adapt,
    Select,
    Sheet,
    YStack,
} from 'tamagui';

// TODO: does not work onPress by item (Google Pixel 8A, but it works in emulator). See issues on gitHub
export interface SelectorOption {
    name: string;
    value: string;
};

export interface ExSelectProps extends SelectProps {
    options?: SelectorOption[];
    label?: string;
    palceholder?: string;
};

/**
 * SelectDemoItem is a reusable component wrapping a customized Select.
 * It supports both custom and native modes based on the `native` prop.
 */
const Selector: React.FC<ExSelectProps> = ({
    options = [],
    palceholder,
    label,
    ...props
}) => {
    const [val, setVal] = React.useState('apple');

    const onOpenChange = (open: boolean) => {
        console.log("onOpenChange", open);
    }

    const onValueChange = (value: string) => {
        console.log("onValueChange", value);
        setVal(value);
    }

    return (
        <Select
            value={val}
            onValueChange={onValueChange}
            onOpenChange={onOpenChange}
            disablePreventBodyScroll
            {...props}
        >
            {/* The trigger button for the select */}
            <Select.Trigger width={220} iconAfter={ChevronDown}>
                <Select.Value placeholder={palceholder} />
            </Select.Trigger>

            {/* Use Adapt to render a Sheet for touch platforms */}
            <Adapt platform="touch">
                <Sheet modal dismissOnSnapToBottom animation='200ms'>
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        bg="$shadowColor"
                        animation="200ms"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>

            {/* Main select content including scroll buttons and list viewport */}
            <Select.Content zIndex={200000}>
                {/* Scroll Up Button with a gradient overlay */}
                <Select.ScrollUpButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack z={10}>
                        <ChevronUp size={20} />
                    </YStack>
                </Select.ScrollUpButton>

                {/* Viewport listing the select options */}
                <Select.Viewport minW={200}>
                    <Select.Group>
                        <Select.Label>{label}</Select.Label>
                        {React.useMemo(
                            () =>
                                options.map((item, i) => (
                                    <Select.Item
                                        index={i}
                                        key={item.name}
                                        value={item.value}
                                    >
                                        <Select.ItemText>{item.name}</Select.ItemText>
                                        <Select.ItemIndicator marginLeft="auto">
                                            <Check size={16} />
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                )),
                            [options] // items are static; no dependencies needed here
                        )}
                    </Select.Group>
                </Select.Viewport>

                {/* Scroll Down Button with a gradient overlay */}
                <Select.ScrollDownButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack z={10}>
                        <ChevronDown size={20} />
                    </YStack>
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    );
}

export default Selector;
