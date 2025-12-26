import { useSafeAreaInsets } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import { PlusSquare } from "@tamagui/lucide-icons";
import UI from "src/shared/components/ui";
import React from "react";
import { useRouter } from "expo-router";

const NewNoteButton: React.FC = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <UI.Button
            position="absolute"
            size="$7"
            b={insets.bottom + 20}
            r={15}
            square
            onPress={() => router.push("/diary/newDiary")}
        >
            <PlusSquare />
        </UI.Button>
    );
};

export default observer(NewNoteButton);
