import { GetProps, View, styled } from '@tamagui/core'

export const ScreenView = styled(View, {
    paddingBlock: 20,
    paddingInline: 20,
    flex: 1,
});

export type ScreenProps = GetProps<typeof ScreenView>;
