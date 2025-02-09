import { StyleSheet } from 'react-native';
import React from 'react';
import { Image, type ImageSource } from 'expo-image';

type Props = {
    imgSource: ImageSource;
    selectedImage?: string;
};

const ImageViewer: React.FC<Props> = ({
    imgSource,
    selectedImage,
}: Props): JSX.Element => {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
    return <Image source={imageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '85%',
        borderRadius: 8,
    },
});

export default ImageViewer;
