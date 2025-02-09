import { useState } from 'react';
import { FlatList, Platform, Pressable } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
    onSelect: (image: ImageSource) => void;
    onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
    const [emoji] = useState<ImageSource[]>([
        require('../../assets/images/emoji1.png'),
        require('../../assets/images/emoji2.png'),
        require('../../assets/images/emoji3.png'),
        require('../../assets/images/emoji4.png'),
        require('../../assets/images/emoji5.png'),
        require('../../assets/images/emoji6.png'),
    ]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            contentContainerClassName='rounded-t-lg px-5 flex-row items-center justify-between'
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        onSelect(item);
                        onCloseModal();
                    }}>
                    <Image
                        source={item}
                        key={index}
                        style={{
                            width: 50,
                            height: 50,
                            marginRight: 20,
                        }}
                    />
                </Pressable>
            )}
        />
    );
}
