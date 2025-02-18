import { Modal, Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import S from './EmojiPickerModal.styled';

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
            <S.container>
                <S.header>
                    <S.title>Choose a sticker</S.title>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name='close' color='#fff' size={22} />
                    </Pressable>
                </S.header>
                {children}
            </S.container>
        </Modal>
    );
}
