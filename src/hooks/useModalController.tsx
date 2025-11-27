import { useState } from "react";

export const useModalController = () => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return {
        open,
        onOpen,
        onClose,
    };
};

export default useModalController;
