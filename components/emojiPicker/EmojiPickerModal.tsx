import { Modal, View, Text, Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function EmojiPickerModal({ isVisible, children, onClose }: Props) {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View className="absolute bottom-0 w-full h-1/4 bg-[#25292e] rounded-t-2xl">
                <View className="flex-row items-center justify-between h-[16%] bg-[#464C55] rounded-t-lg px-5">
                    <Text className="text-white text-base">Choose a sticker</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                {children}
            </View>
        </Modal>
    );
}
