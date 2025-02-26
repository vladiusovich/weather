import TabNavigation from '@/components/common/tabNavigation/TabNavigation';
import { Home, Cloud } from '@tamagui/lucide-icons'

const tabs = [
    {
        name: 'index',
        options: {
            title: 'About',
        },
        Icon: Home,
    },
    {
        name: 'weather',
        options: {
            title: 'Weather',
        },
        Icon: Cloud,
    },
];

const TabLayout = () => {
    return <TabNavigation tabs={tabs} />;
};

export default TabLayout;
