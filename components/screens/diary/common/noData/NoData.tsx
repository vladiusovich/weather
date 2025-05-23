import { observer } from 'mobx-react-lite';
import UI from '@/components/ui';
import { Annoyed } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';

const NoData: React.FC = () => {
    const { t } = useTranslation();

    return (
        <UI.Papper
            p='$4'
            bg={'$background02'}
            flex={1}
            minH={250}
        >
            <UI.YStack flex={1}>
                <UI.YStack
                    justify='center'
                    items='center'
                    gap='$3'
                    flex={1}
                >
                    <Annoyed size={60} />
                    <UI.Typo.Text>
                        {t('common.noData.header')}
                    </UI.Typo.Text>
                </UI.YStack>
            </UI.YStack>
        </UI.Papper>
    );
};

export default observer(NoData);
