import { View, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { type ImageSource } from "expo-image";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import ImageViewer from '@/components/ImageViewer';
import EmojiPicker from '@/components/emojiPicker/EmojiPicker';
import EmojiList from '@/components/emojiPicker/EmojiList';
import EmojiSticker from '@/components/emojiPicker/EmojiSticker';
import CameraPreview from '@/components/camera/CameraPreview';
import React from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { InfoIcon, AddIcon } from "@/components/ui/icon"
import { saveFileNative, saveFileWeb } from '@/utils/fileSystemHelper';
import useToastNotification from '@/utils/useToastNotification';

const PlaceholderImage = require('@/assets/images/background-image.png');

const PhotoSticker = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isUseCamera, setIsUseCamera] = useState<boolean>(false);

    const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const imageRef = useRef<View>(null);

    const toastNotification = useToastNotification();

    if (status === null) {
        requestPermission();
    }

    const pickImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            toastNotification.notify({
                title: "Upppsss",
                description: "You did not select any image",
                action: "warning",
            });
        }
    };

    const onPressCapture = (uri: string) => {
        if (uri !== "") {
            setSelectedImage(uri);
            setShowAppOptions(true);
            setIsUseCamera(false);
        }
    };

    const onReset = () => {
        setShowAppOptions(false);
    };

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    const onUseCamera = () => {
        setIsUseCamera(true);
    };

    const onSaveImageAsync = async () => {
        if (Platform.OS === 'web') {
            await saveFileWeb(imageRef.current);
        } else {
            await saveFileNative(imageRef);
        }

        toastNotification.notify({
            title: "Image saved",
            description: "Your image has been saved successfully",
            action: "info",
        });
    };

    if (isUseCamera) {
        return <CameraPreview onPressCapture={onPressCapture} />;
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.imageContainer}>
                <View ref={imageRef} collapsable={false}>
                    <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                    {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
                </View>
            </View>
            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <Button variant="solid" onPress={onReset}>
                            <MaterialIcons name="refresh" size={24} color="#fff" />
                            <ButtonText>Reset</ButtonText>
                        </Button>

                        <Button variant="solid" onPress={onAddSticker}>
                            <ButtonIcon as={AddIcon} className="mr-2" />
                        </Button>

                        <Button variant="solid" onPress={onSaveImageAsync}>
                            <MaterialIcons name="save-alt" size={24} color="#fff" />
                            <ButtonText>Save</ButtonText>
                        </Button>
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button variant="solid" onPress={pickImageAsync}>
                        <ButtonIcon as={InfoIcon} className="mr-2" />
                        <ButtonText>Choose a photo</ButtonText>
                    </Button>
                    <Button size="md" variant="solid" action="secondary" onPress={() => onUseCamera()}>
                        <ButtonText>Use camera</ButtonText>
                    </Button>
                    <Button size="md" variant="outline" action="secondary" onPress={() => setShowAppOptions(true)}>
                        <ButtonText>Use this photo</ButtonText>
                    </Button>
                </View>
            )}
            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
            </EmojiPicker>
        </GestureHandlerRootView>
    );
};

export default PhotoSticker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
    },
    footerContainer: {
        width: '90%',
        gap: 10,
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
