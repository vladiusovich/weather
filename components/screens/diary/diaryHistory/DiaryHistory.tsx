import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import UI from '@/components/ui';
import HistoryItem from './historyItem/HistoryItem';
import NoData from '../common/noData/NoData';

const DiaryHistory: React.FC = () => {
    const appStore = useAppStore();
    const history = appStore.diary.history.data;

    return (
        <UI.YStack
            gap={'$2'}
        >
            {history.length === 0 && <NoData />}
            {history.map((i) => {
                return (
                    <HistoryItem key={i.id} data={i} />
                );
            })}
        </UI.YStack>
    );
};

export default observer(DiaryHistory);
