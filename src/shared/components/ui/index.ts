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
import Datepicker from "./datepicker/Datepicker";
import ScreenWrapper from "./layoutWrapper/LayoutWrapper";
import Paper from "./paper/Paper";
import SheetView from "./sheet/SheetView";
import Selector from "./selector/Selector";
import Slider from "./slider/Slider";
import TextArea from "./textArea/TextArea";
import Chip from "./chip/Chip";
import Input from "./input/Input";
import Searchbar from "./searchbar/Searchbar";
import { Separator, View } from "tamagui";
import List from "./list/List";
import FallbackMessage from "./fallbackMessage/FallbackMessage";

export * from "./table/Table";
export * from "./selector/Selector";
export * from "./input/Input";
export * from "./searchbar/Searchbar";
export * from "./datepicker/Datepicker";
export * from "./list/List";
export * from "./fallbackMessage/FallbackMessage";

const UI = {
    Typo: Typo,
    DatePicker: Datepicker,

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
    Input,
    Searchbar,
    Slider,
    List,
    FallbackMessage,

    Paper,
    SheetView,
    Modal,
    ScrollView,
    View,
    ScreenWrapper,
};

export default UI;
