import UI from '@/components/ui';

const AboutScreen = () => {
    return (
        <UI.ScreenView>
            <UI.YStack
                fullscreen
                justify='center'
                items='center'
            >
                <UI.Typo.Text>About screen</UI.Typo.Text>
            </UI.YStack>
        </UI.ScreenView>
    );
};

export default AboutScreen;
