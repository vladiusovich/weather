import domtoimage from 'dom-to-image';
import { Platform, View } from "react-native"
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

const saveFileWeb = async (view: View | null) => {
    if (Platform.OS !== "web") {
        throw new Error("This function is only available on web");
    }

    try {
        const dataUrl = await domtoimage.toJpeg(view, {
            quality: 0.95,
            width: 320,
            height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
    } catch (e) {
        console.error(e);
    }
}

const saveFileNative = async (imageRef: React.RefObject<View>) => {
    if (Platform.OS === "web") {
        throw new Error("This function is only available on web");
    }
    try {
        const localUri = await captureRef(imageRef, {
            height: 440,
            quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
    } catch (e) {
        console.error(e);
    }

}

export { saveFileWeb, saveFileNative };