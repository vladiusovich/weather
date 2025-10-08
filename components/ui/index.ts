import XStack from "./stack/XStack";
import YStack from "./stack/YStack";
import ZStack from "./stack/ZStack";
import Card from "./card/Card";
import Button from "./button/Button";
import Modal from "./modal/Modal";
import ScrollView from "./scrollView/ScrollView";
import Loader from "./loader/Loader";
import Skeleton from "./skeleton/Skeleton";

// TODO: refactor it
import Typo from "./typo/Typo";
import Table from "./table/Table";
import DatePickerSelector from "./datapicker/index";
import ScreenWrapper from "./layoutWrapper/LayoutWrapper";
import Paper from "./paper/Paper";
import SheetView from "./sheet/SheetView";
import Selector from "./selector/Selector";
import Slider from "./slider/Slider";
import TextArea from "./textArea/TextArea";
import Chip from "./chip/Chip";
import { Separator, View } from "tamagui";

export * from "./table/Table";
export * from "./datapicker/index";
export * from "./selector/Selector";

const UI = {
    Typo: Typo,
    DatePicker: DatePickerSelector,

    Button,

    XStack,
    YStack,
    ZStack,
    Table,
    Chip,

    Card,
    Loader,
    Skeleton,

    Separator,

    Selector,
    TextArea,
    Slider,

    Paper,
    SheetView,
    Modal,
    ScrollView,
    View,
    ScreenWrapper,
};

export default UI;
