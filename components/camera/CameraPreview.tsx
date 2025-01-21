import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import IconButton from '../ui/iconButton/IconButton';

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
                <Button onPress={requestPermission} title="grant permission" />
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
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={cameraType}>
                <View style={styles.buttonContainer}>
                    <IconButton icon="cameraswitch" label="Flip" onPress={onFlipCamera} />
                    <IconButton icon="camera-alt" label="Capture" onPress={onCapture} />
                </View>
            </CameraView>
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
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "stretch",
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

