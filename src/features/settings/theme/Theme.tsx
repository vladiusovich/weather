import { observer } from "mobx-react-lite";
import { ScrollView } from "tamagui";
import UI from "src/shared/components/ui";

const Theme = observer(() => {
    return (
        <>
            <UI.ScreenWrapper Component={ScrollView}>
                <UI.Typo.Paragraph>
                    TODO
                </UI.Typo.Paragraph>
            </UI.ScreenWrapper>
        </>
    );
});

export default Theme;
