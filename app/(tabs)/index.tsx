import UI from '@/components/ui';

const AboutScreen = () => {
    return (
        <UI.YStack
            fullscreen
            justify='center'
            verticalAlign='center'
            flex={1}
            background='$color'>
            <UI.Typo.Text>About screen</UI.Typo.Text>
        </UI.YStack>
    );
};

export default AboutScreen;
