import UI from "@/components/ui";
import { observer } from "mobx-react-lite";
import { range } from "@/utils/array.helper";

const TestField: React.FC = () => {
    const options = range(1, 5, 1).map((s) => {
        return {
            name: `Test val ${s}`,
            value: s.toString(),
        };
    });

    return (
        <UI.Selector
            name="test"
            options={options}
            label='test uphhh'
        />
    );
};

export default observer(TestField);
