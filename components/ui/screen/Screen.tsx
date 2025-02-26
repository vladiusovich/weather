import { GetProps, View, styled } from '@tamagui/core'

export const Screen = styled(View, {
    paddingBlock: 20,
    paddingInline: 20,
    flex: 1,
});

export type ScreenProps = GetProps<typeof Screen>;
