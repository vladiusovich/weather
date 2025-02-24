// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// import React, { useRef, useState } from 'react';
// import { View } from 'react-native';
// import UI from '@/components/ui';
// import useBackHandler from '@/hooks/useBackHandler';
// import CameraPermissionDialog from './cameraPermissionDialog/CameraPermissionDialog';
// import S from './CameraScreen.styled';

// interface CameraPreviewProps {
//     isOpen: boolean;
//     onPressCapture: (url: string) => void;
//     onClose: () => void;
// }

// const CameraScreen: React.FC<CameraPreviewProps> = ({
//     isOpen,
//     onPressCapture,
//     onClose,
// }) => {
//     const [cameraType, setCameraType] = useState<CameraType>('back');
//     const [permission, requestPermission] = useCameraPermissions();
//     const cameraRef = useRef<CameraView>(null);

//     useBackHandler({
//         backAction: onClose,
//         state: isOpen,
//     });

//     const onCapture = async () => {
//         if (cameraRef) {
//             const photo = await cameraRef.current?.takePictureAsync({
//                 quality: 1,
//                 imageType: 'jpg',
//             });

//             onPressCapture(photo?.uri ?? '');
//         }
//     };

//     const onFlipCamera = () => {
//         setCameraType((current) => (current === 'back' ? 'front' : 'back'));
//     };

//     if (!permission) {
//         return <View />;
//     }

//     return (
//         <S.portal open={isOpen}>
//             <S.container>
//                 {isOpen && !permission.granted && (
//                     <CameraPermissionDialog
//                         onSuccess={requestPermission}
//                         onClose={onClose}
//                     />
//                 )}

//                 {isOpen && permission.granted && (
//                     <>
//                         <S.cameraView ref={cameraRef} facing={cameraType} />
//                         <S.actions>
//                             <UI.Stack
//                                 direction='row'
//                                 justifyContent='space-around'>

// <UI.Button onPress={onFlipCamera}>Flip</UI.Button>
// <UI.Button onPress={onCapture}>Capture</UI.Button>

//                             </UI.Stack>
//                         </S.actions>
//                     </>
//                 )}
//             </S.container>
//         </S.portal>
//     );
// };

// export default CameraScreen;
