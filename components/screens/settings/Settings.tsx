import { observer } from "mobx-react-lite";
import UI from "@/components/ui";

// TODO
const Settings = () => {
    return (
        <UI.YStack flex={1} justify={"center"} items={"center"}>
            <UI.Typo.Text>
                Settings
            </UI.Typo.Text>
        </UI.YStack>
    );
};

export default observer(Settings);
