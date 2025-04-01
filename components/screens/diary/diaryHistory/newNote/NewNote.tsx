import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React from 'react';

// TODO: #44 implement create note
const NewNote: React.FC = () => {
    const appStore = useAppStore();

    return null;
};

export default observer(NewNote);

