import XStack from './stack/XStack';
import YStack from './stack/YStack';
import ZStack from './stack/ZStack';
import Card from './card/Card';
import Button from './button/Button';
import Modal from './modal/Modal';
import ScrollView from './scrollView/ScrollView';
import Loader from './loader/Loader';

// TODO: refactor it
import { H1, H2, H3, H4, H5, H6, Paragraph, SizableText, Text, Separator, View } from 'tamagui';
import Table from './table/Table';
import Fab from './fab/Fab';

export * from './table/Table';

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
    Fab,

    XStack,
    YStack,
    ZStack,
    Table,

    Card,
    Loader,

    Separator,

    Modal,
    ScrollView,
    View,
};

export default UI;
