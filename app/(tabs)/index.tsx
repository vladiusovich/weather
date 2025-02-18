import layout from '../layout/layout.styled';
import UI from '@/components/ui';

const AboutScreen = () => {
    return (
        <layout.view>
            <UI.Stack
                direction='column'
                justifyContent='center'
                alignItems='center'
                flex={1}>
                <UI.Typography variant='default'>About screen</UI.Typography>
            </UI.Stack>
        </layout.view>
    );
};

export default AboutScreen;
