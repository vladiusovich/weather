import { useEffect } from 'react';

export const useCallbackIf = (
    state: boolean,
    callback: () => void
) => {
    useEffect(() => {
        if (state) {
            callback();
        }
    }, [callback, state]);
};

export default useCallbackIf;
