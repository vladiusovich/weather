import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonText } from '../ui/button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { VStack } from '../ui/vstack';

interface CameraPreviewProps {
    onPressCapture: (url: string) => void;
};

const CameraPreview: React.FC<CameraPreviewProps> = ({
    onPressCapture
}) => {
    const [cameraType, setCameraType] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button size="md" variant="solid" onPress={requestPermission}>
                    <ButtonText>Grant permission</ButtonText>
                </Button>
            </View>
        );
    }

    const onCapture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.current?.takePictureAsync({
                quality: 1,
                imageType: "jpg",
            });

            onPressCapture(photo?.uri ?? "");
        }
    }

    const onFlipCamera = () => {
        setCameraType(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View className='flex-1' style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={cameraType} />
            <View style={styles.buttonControllers}>
                <Button variant="link" onPress={onFlipCamera}>
                    <VStack space="sm" className="">
                        <MaterialIcons name="cameraswitch" size={24} color="#fff" />
                        <ButtonText variant="solid">Flip</ButtonText>
                    </VStack>
                </Button>
                <Button variant="link" onPress={onCapture}>
                    <VStack space="sm">
                        <MaterialIcons name="camera-alt" size={24} color="#fff" />
                        <ButtonText variant="solid">Capture</ButtonText>
                    </VStack>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    buttonControllers: {
        position: 'absolute',
        bottom: 0,
        paddingTop: 20,
        paddingBottom: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "stretch",
        backgroundColor: '#25292e80',
    },
    button: {
        padding: 10,
        backgroundColor: '#25292e',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CameraPreview;

