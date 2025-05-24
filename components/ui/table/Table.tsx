import React from 'react';
import YStack from '../stack/YStack';
import XStack from '../stack/XStack';
import { Text } from 'tamagui';
import NoData from './NoData';
import Loader from '../loader/Loader';

export type Column<T> = {
    key: keyof T;
    title: string;
    render?: (item: T) => React.ReactNode;
};

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
};

const Table = <T,>({ data, columns, isLoading = false }: TableProps<T>) => {
    const hasData = data.length > 0;

    return (
        <YStack
            minH={'$12'}
        >
            {/* Table Header */}
            <XStack>
                {columns.map((col, index) => (
                    <YStack
                        key={index}
                        flex={1}
                        items={'center'}
                        paddingBlock={'$2'}
                        borderBottomWidth={'$1'}
                        borderColor={'$black5'}
                    >
                        <Text>{col.title}</Text>
                    </YStack>
                ))}
            </XStack>

            {/* Table Rows */}
            {!hasData && <NoData />}
            {isLoading && !hasData && <Loader size='small' />}
            {hasData && data.map((row, rowIndex) => (
                <XStack
                    key={rowIndex}
                >
                    {columns.map((col, colIndex) => (
                        <YStack
                            key={colIndex}
                            flex={1}
                            items={'center'}
                            paddingBlock={'$2'}
                            borderBottomWidth={'$1'}
                            borderColor={'$black3'}
                        >
                            {col.render
                                ? col.render(row)
                                : <Text>
                                    {row[col.key]?.toString()}
                                </Text>}
                        </YStack>
                    ))}
                </XStack>
            ))}
        </YStack>
    );
};

export default Table;
