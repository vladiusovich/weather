import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonText } from '../ui/button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { VStack } from '../ui/vstack';
import { Portal } from '../ui/portal';
import useBackHandler from '@/hooks/useBackHandler';
import CameraPermissionDialog from './CameraPermissionDialog';

interface CameraPreviewProps {
    isOpen: boolean;
    onPressCapture: (url: string) => void;
    onClose: () => void;
}

const CameraScreen: React.FC<CameraPreviewProps> = ({
    isOpen,
    onPressCapture,
    onClose,
}) => {
    const [cameraType, setCameraType] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    useBackHandler({
        backAction: onClose,
        state: isOpen,
    });

    const onCapture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.current?.takePictureAsync({
                quality: 1,
                imageType: 'jpg',
            });

            onPressCapture(photo?.uri ?? '');
        }
    };

    const onFlipCamera = () => {
        setCameraType((current) => (current === 'back' ? 'front' : 'back'));
    };

    if (!permission) {
        return <View />;
    }

    return (
        <>
            <CameraPermissionDialog
                isOpen={isOpen && !permission.granted}
                onSuccess={requestPermission}
                onClose={onClose}
            />

            <Portal
                isOpen={isOpen && permission.granted}
                style={styles.container}>
                <View className='flex-1 justify-center items-center'>
                    <CameraView
                        ref={cameraRef}
                        style={styles.container}
                        facing={cameraType}
                    />
                    <View className='absolute bottom-0 pt-5 pb-5 rounded-t-lg w-full flex flex-row justify-around items-stretch bg-[#25292e80]'>
                        <Button variant='link' onPress={onFlipCamera}>
                            <VStack space='sm' className=''>
                                <MaterialIcons name='cameraswitch' size={24} />
                                <ButtonText variant='solid'>Flip</ButtonText>
                            </VStack>
                        </Button>
                        <Button variant='link' onPress={onCapture}>
                            <VStack space='sm' className='items-center'>
                                <MaterialIcons name='camera-alt' size={24} />
                                <ButtonText variant='solid'>Capture</ButtonText>
                            </VStack>
                        </Button>
                    </View>
                </View>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default CameraScreen;
