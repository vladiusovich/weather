import { StyleSheet, View, Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
    label: string;
    onPress?: () => void;
    icon?: keyof typeof MaterialIcons.glyphMap;
};

export default function Button({ label, icon, onPress }: Props) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <View style={styles.stack}>
                {icon && (<MaterialIcons name={icon} size={18} color="#fff" />)}
                <Text style={styles.buttonLabel}>{label}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    stack: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 10,
    },
    button: {
        width: "100%",
        height: 50,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cccccc80',
        backgroundColor: '#25292e',

        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});
