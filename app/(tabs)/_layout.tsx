import TabNavigation from '@/components/common/tabNavigation/TabNavigation';

const tabs = [
    {
        name: 'index',
        options: {
            title: 'About',
        },
        activeIcon: 'information-circle',
        inactiveIcon: 'information-circle-outline',
    },
    // {
    //     name: 'emojiPicker',
    //     options: {
    //         title: 'Photo Sticker',
    //     },
    //     activeIcon: 'camera-sharp',
    //     inactiveIcon: 'camera-sharp',
    // },
    // {
    //     name: 'weather',
    //     options: {
    //         title: 'Weather',
    //     },
    //     activeIcon: 'cloud-circle',
    //     inactiveIcon: 'cloud-circle-outline',
    // },
];

const TabLayout = () => {
    return <TabNavigation tabs={tabs} />;
};

export default TabLayout;
