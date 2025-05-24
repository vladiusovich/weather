import { useState } from 'react';

export const useRefreshController = (
    refreshCallback: () => Promise<void>
) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await refreshCallback();
        setRefreshing(false);
    }

    return {
        refreshing,
        handleRefresh,
    }
};

export default useRefreshController;
