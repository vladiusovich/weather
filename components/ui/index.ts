import XStack from './stack/XStack';
import YStack from './stack/YStack';
import ZStack from './stack/ZStack';
import Card from './card/Card';
import Button from './button/Button';
import Modal from './modal/Modal';
import ScrollView from './scrollView/ScrollView';

// TODO: refactor it
import { H1, H2, H3, H4, H5, H6, Paragraph, SizableText, Text } from 'tamagui';

export * from './modal/Modal';
export * from './scrollView/ScrollView';

const UI = {
    Typo: {
        H1,
        H2,
        H3,
        H4,
        H5,
        H6,
        Paragraph,
        SizableText,
        Text,
    },

    Button,

    XStack,
    YStack,
    ZStack,

    Card,

    Modal,
    ScrollView,
};

export default UI;
