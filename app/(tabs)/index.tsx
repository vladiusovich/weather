import UI from '@/components/ui';

const AboutScreen = () => {
    return (
        <UI.Screen>
            <UI.YStack
                fullscreen
                justify='center'
                items='center'
            >
                <UI.Typo.Text>About screen</UI.Typo.Text>
            </UI.YStack>
        </UI.Screen>
    );
};

export default AboutScreen;
