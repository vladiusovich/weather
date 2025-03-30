import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import UI from '@/components/ui';
import HistoryItem from './historyItem/HistoryItem';


const DiiaryHistory: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const history = appStore.diary.history.data;

    return (
        <UI.YStack
            gap={'$2'}
        >
            {history.map((i) => {
                return (
                    <HistoryItem key={i.id} data={i} />
                );
            })}
        </UI.YStack>
    );
};

export default observer(DiiaryHistory);
