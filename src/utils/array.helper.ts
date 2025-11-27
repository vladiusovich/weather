const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

const sortBy = <T extends Record<string, any>>(
    array: T[],
    key: keyof T,
    order: "asc" | "desc" = "asc"
): T[] => {
    return [...array].sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (valA == null || valB == null) return 0;

        if (valA < valB) return order === "asc" ? -1 : 1;
        if (valA > valB) return order === "asc" ? 1 : -1;
        return 0;
    });
};

const sortByDate = <T extends Record<string, any>>(
    array: T[],
    key: keyof T,
    order: "asc" | "desc" = "asc"
): T[] => {
    return [...array].sort((a, b) => {
        const dateA = new Date(a[key] as string).getTime();
        const dateB = new Date(b[key] as string).getTime();

        if (isNaN(dateA) || isNaN(dateB)) return 0;

        if (dateA < dateB) return order === "asc" ? -1 : 1;
        if (dateA > dateB) return order === "asc" ? 1 : -1;
        return 0;
    });
};


export { range, sortBy, sortByDate };
