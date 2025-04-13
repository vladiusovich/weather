import React, { useEffect, useState } from 'react';
import { Pressable, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { XStack, Input, Text, View } from 'tamagui';
import { Calendar, Clock } from '@tamagui/lucide-icons';

interface DatePickerProps {
    date?: Date;
    type: 'date' | 'time';
    confirmText?: string;
    cancelText?: string;
    accentColor?: string;
    textColor?: string;
    buttonTextColorIOS?: string;
    onChange?: (date: Date) => void;
    onConfirm?: (date: Date) => void;
}

const NativeDateTimePicker: React.FC<DatePickerProps> = (props) => {
    const { date: initialDate, type = 'date' } = props;
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<Date>(initialDate || new Date());

    useEffect(() => {
        if (initialDate) {
            setDate(initialDate);
        }
    }, [initialDate]);

    // Handler for the DateTimePicker changes
    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            // In Android, the picker appears as a dialog and returns an event
            setShow(false);
            if (event.type === 'set' && selectedDate) {
                setDate(selectedDate);
                props?.onConfirm?.(selectedDate);
                props?.onChange?.(selectedDate);
            }
        } else {
            // On iOS, the picker is inline inside our modal.
            // We update the date as the user scrolls.
            if (selectedDate) {
                setDate(selectedDate);
                props?.onChange?.(selectedDate);
            }
        }
    };

    // In iOS, user confirms by pressing a button.
    const handleConfirmIOS = () => {
        setShow(false);
        props.onConfirm && props.onConfirm(date);
    };

    return (
        <>
            <Pressable onPress={() => setShow(true)}>
                <XStack items="center" justify="flex-end" minW={150}>
                    <Input pointerEvents="none" editable={false} grow={1}>
                        {type === 'date' && date.toLocaleDateString()}
                        {type === 'time' && date.toLocaleTimeString()}
                    </Input>
                    <View position="absolute" width={30}>
                        <XStack paddingBlock={10}>
                            {type === 'date' && <Calendar />}
                            {type === 'time' && <Clock />}
                        </XStack>
                    </View>
                </XStack>
            </Pressable>

            {/** Android: show DateTimePicker as a dialog */}
            {show && Platform.OS === 'android' && (
                <DateTimePicker
                    value={date}
                    mode={type}
                    display="default"
                    onChange={onChange}
                />
            )}

            {/** iOS: wrap the DateTimePicker in a modal so we can show Cancel/Confirm buttons */}
            {Platform.OS === 'ios' && (
                <Modal visible={show} transparent animationType="slide">
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View>
                            <DateTimePicker
                                value={date}
                                mode={type}
                                display="spinner"
                                onChange={onChange}
                            // You can potentially use props.accentColor, props.textColor, etc.
                            // but note that they are not standard props for the community picker.
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Pressable onPress={() => setShow(false)} style={{ padding: 10 }}>
                                    <Text style={{ color: props.buttonTextColorIOS || 'blue' }}>
                                        {props.cancelText || 'Cancel'}
                                    </Text>
                                </Pressable>
                                <Pressable onPress={handleConfirmIOS} style={{ padding: 10 }}>
                                    <Text style={{ color: props.buttonTextColorIOS || 'blue' }}>
                                        {props.confirmText || 'Confirm'}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
};

export default NativeDateTimePicker;
