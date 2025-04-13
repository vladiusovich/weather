import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ButtonProps } from 'tamagui';

// TODO: remove?
const Fab: React.FC<ButtonProps> = ({ ...props }) => {
    const insets = useSafeAreaInsets();

    return (
        <Button
            {...props}
            bottom={insets.bottom + props?.bottom ?? 0}
            circular
            elevate
        />
    )
};

export default Fab;
