import { useSafeAreaInsets } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import { PlusSquare } from "@tamagui/lucide-icons";
import UI from "@/components/ui";
import React from "react";
import { useRouter } from "expo-router";

const NewNoteButton: React.FC = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const onPressHandle = () => {
        router.push("/newDiaryNote");
    };

    return (
        <UI.Button
            position="absolute"
            size="$7"
            b={insets.bottom + 20}
            r={15}
            square
            onPress={onPressHandle}
        >
            <PlusSquare />
        </UI.Button>
    );
};

export default observer(NewNoteButton);
