import React from 'react';
import UI from '@/components/ui';

export type Column<T> = {
    key: keyof T;
    title: string;
    render?: (item: T) => React.ReactNode;
};

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
};

const Table = <T,>({ data, columns }: TableProps<T>) => (
    <UI.YStack overflow="hidden">
        {/* Table Header */}
        <UI.XStack>
            {columns.map((col, index) => (
                <UI.YStack
                    key={index}
                    flex={1}
                    items={'center'}
                    paddingBlock={'$2'}
                    borderBottomWidth={'$1'}
                    borderColor={'$black5'}
                >
                    <UI.Typo.H6>{col.title}</UI.Typo.H6>
                </UI.YStack>
            ))}
        </UI.XStack>

        {/* Table Rows */}
        {data.map((row, rowIndex) => (
            <UI.XStack
                key={rowIndex}
            >
                {columns.map((col, colIndex) => (
                    <UI.YStack
                        key={colIndex}
                        flex={1}
                        paddingBlock={'$2'}
                        borderBottomWidth={'$1'}
                        borderColor={'$black3'}
                    >
                        <UI.Typo.Text>
                            {col.render ? col.render(row) : row[col.key]?.toString()}
                        </UI.Typo.Text>
                    </UI.YStack>
                ))}
            </UI.XStack>
        ))}
    </UI.YStack>
);

export default Table;
