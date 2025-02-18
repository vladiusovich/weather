import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef, useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { type ImageSource } from 'expo-image';
import ImageViewer from '@/components/emojiPicker/ImageViewer';
import EmojiPickerModal from '@/components/emojiPicker/emojiPickerModal/EmojiPickerModal';
import EmojiList from '@/components/emojiPicker/EmojiList';
import EmojiSticker from '@/components/emojiPicker/EmojiSticker';
import CameraScreen from '@/components/сameraScreen/CameraScreen';
import React from 'react';
import { saveFileAsync } from '@/utils/fileSystemHelper';
import useToastNotification from '@/hooks/useToastNotification';
import OptionsActions from '@/components/emojiPicker/OptionsActions';
import FooterActions from '@/components/emojiPicker/FooterActions';

const PlaceholderImage = require('@/assets/images/background-image.png');

const EmojiPicker = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(
        undefined,
    );
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isUseCamera, setIsUseCamera] = useState<boolean>(false);
    const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
        undefined,
    );

    const imageRef = useRef<View>(null);

    const toastNotification = useToastNotification();

    const handlePickImage = useCallback(async () => {
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
                title: 'Upppsss',
                description: 'You did not select any image',
                action: 'warning',
            });
        }
    }, [toastNotification]);

    const handleCapture = useCallback((uri: string) => {
        if (uri !== '') {
            setSelectedImage(uri);
            setShowAppOptions(true);
            setIsUseCamera(false);
        }
    }, []);

    const handleReset = useCallback(() => {
        setShowAppOptions(false);
    }, []);

    const handleAddSticker = useCallback(() => {
        setIsModalVisible(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalVisible(false);
    }, []);

    const handleUseCamera = useCallback(() => {
        setIsUseCamera(true);
    }, []);

    const handleSaveImage = useCallback(async () => {
        await saveFileAsync(imageRef);
        toastNotification.notify({
            title: 'Image saved',
            description: 'Your image has been saved successfully',
            action: 'info',
        });
    }, [imageRef, toastNotification]);

    const handleUseSelectedPhoto = useCallback(() => {
        setShowAppOptions(true);
    }, []);

    return (
        <>
            <CameraScreen
                isOpen={isUseCamera}
                onPressCapture={handleCapture}
                onClose={() => setIsUseCamera(false)}
            />
            <View className='flex-1 bg-[#25292e]'>
                <View className='w-full flex-1'>
                    <GestureHandlerRootView>
                        <View
                            ref={imageRef}
                            collapsable={false}
                            className='flex-1 items-center'>
                            <ImageViewer
                                imgSource={PlaceholderImage}
                                selectedImage={selectedImage}
                            />
                            {pickedEmoji && (
                                <EmojiSticker
                                    imageSize={40}
                                    stickerSource={pickedEmoji}
                                />
                            )}
                        </View>
                    </GestureHandlerRootView>
                </View>
                <View className='flex items-center p-4'>
                    {showAppOptions ? (
                        <OptionsActions
                            onReset={handleReset}
                            onAddSticker={handleAddSticker}
                            onSaveImage={handleSaveImage}
                        />
                    ) : (
                        <FooterActions
                            onPickImage={handlePickImage}
                            onUseCamera={handleUseCamera}
                            onUseSelectedPhoto={handleUseSelectedPhoto}
                        />
                    )}
                </View>
                <EmojiPickerModal
                    isVisible={isModalVisible}
                    onClose={handleModalClose}>
                    <EmojiList
                        onSelect={setPickedEmoji}
                        onCloseModal={handleModalClose}
                    />
                </EmojiPickerModal>
            </View>
        </>
    );
};

export default EmojiPicker;
