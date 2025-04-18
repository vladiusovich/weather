import { useState } from 'react';

type Constructor<T, Args extends unknown[] = any[]> = new (...args: Args) => T;

export const useConcreteForm = <T, Args extends unknown[]>(
    FormClass: Constructor<T, Args>,
    ...args: Args
): T => {
    const [form] = useState<T>(() => new FormClass(...args));
    return form;
};

export default useConcreteForm;
