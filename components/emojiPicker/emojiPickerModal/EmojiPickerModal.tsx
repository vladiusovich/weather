import { Modal, Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import UI from '@/components/ui';
import { View } from 'tamagui';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function EmojiPickerModal({
    isVisible,
    children,
    onClose,
}: Props) {
    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View>
                <UI.Typo.H3>
                    <UI.Typo.H5>Choose a sticker</UI.Typo.H5>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name='close' color='#fff' size={22} />
                    </Pressable>
                </UI.Typo.H3>
                {children}
            </View>
        </Modal>
    );
}
