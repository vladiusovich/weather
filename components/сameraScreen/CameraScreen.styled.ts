import { CameraView } from 'expo-camera';
import UI from '../ui';
import styled from 'styled-components/native';

const container = styled.View`
    width: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const S = {
    portal: styled(UI.Portal)`
        width: 100%;
        flex: 1;
    `,
    container,
    cameraView: styled(CameraView)`
        width: 100%;
        flex: 1;
    `,
    actions: styled.View`
        position: absolute;
        height: 100px;
        bottom: 0;
        padding-top: 5px;
        padding-bottom: 5px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: stretch;
        background-color: rgba(37, 41, 46, 0.5); /* bg-[#25292e80] */
    `,
};

export default S;
