import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

interface TabIconProps {
    focused: boolean;
    activeIcon: string;
    inactiveIcon: string;
    color: string;
    size?: number;
}

const TabIcon: React.FC<TabIconProps> = ({
    focused,
    activeIcon,
    inactiveIcon,
    color,
    size = 24,
}) => {
    return (
        <Ionicons
            name={(focused ? activeIcon : inactiveIcon) as any}
            color={color}
            size={size}
        />
    );
};

export default TabIcon;
