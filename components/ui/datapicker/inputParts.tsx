import { getFontSized } from "@tamagui/get-font-sized"
import { getSpace } from "@tamagui/get-token"
import { useState } from "react"
import type { SizeVariantSpreadFunction } from "@tamagui/web"
import type { ColorTokens, FontSizeTokens } from "tamagui"
import {
    Label,
    Button as TButton,
    Input as TInput,
    Text,
    View,
    XGroup,
    createStyledContext,
    getFontSize,
    getVariable,
    isWeb,
    styled,
    useGetThemedIcon,
    useTheme,
    withStaticProperties,
} from "tamagui"

const defaultContextValues = {
    size: "$true",
    scaleIcon: 1.2,
    color: undefined,
} as const

export const InputContext = createStyledContext<{
    size: FontSizeTokens
    scaleIcon: number
    color?: ColorTokens | string
}>(defaultContextValues)

export const defaultInputGroupStyles = {
    size: "$true",
    fontFamily: "$body",
    borderWidth: 1,
    outlineWidth: 0,
    color: "$color",
    ...(isWeb ? { tabIndex: 0 } : { focusable: true }),
    borderColor: "$borderColor",
    backgroundColor: "$color2",
    minWidth: 0,
    hoverStyle: { borderColor: "$borderColorHover" },
    focusStyle: {
        outlineColor: "$outlineColor",
        outlineWidth: 2,
        outlineStyle: "solid",
        borderColor: "$borderColorFocus",
    },
} as const

const InputGroupFrame = styled(XGroup, {
    justify: "space-between",
    context: InputContext,
    variants: {
        unstyled: { false: defaultInputGroupStyles },
        scaleIcon: { ":number": {} as any },
        applyFocusStyle: {
            ":boolean": (val, { props }) => (val ? props.focusStyle || defaultInputGroupStyles.focusStyle : undefined),
        },
        size: { "...size": () => ({}) },
    },
    defaultVariants: {
        // unstyled: process.env.TAMAGUI_HEADLESS === '1',
    },
})

const FocusContext = createStyledContext({
    setFocused: (_val: boolean) => { },
    focused: false,
})

const InputGroupImpl = InputGroupFrame.styleable(({ children, ...rest }, ref) => {
    const [focused, setFocused] = useState(false)
    return (
        <FocusContext.Provider focused={focused} setFocused={setFocused}>
            <InputGroupFrame ref={ref} {...rest}>{children}</InputGroupFrame>
        </FocusContext.Provider>
    )
})

export const inputSizeVariant: SizeVariantSpreadFunction<any> = (val = "$true", extras) => {
    const paddingHorizontal = getSpace(val, { shift: -1, bounds: [2] })
    const fontStyle = getFontSized(val as any, extras)
    if (!isWeb && fontStyle) delete fontStyle.lineHeight
    return {
        ...fontStyle,
        height: val,
        borderRadius: 100_000,
        paddingHorizontal,
    }
}

const InputFrame = styled(TInput, { unstyled: true, context: InputContext })

const InputImpl = InputFrame.styleable((props, ref) => {
    const { setFocused } = FocusContext.useStyledContext()
    const { size } = InputContext.useStyledContext()
    return (
        <View flex={1}>
            <InputFrame
                ref={ref}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                size={size}
                {...props}
            />
        </View>
    )
})

const InputSection = styled(XGroup.Item, {
    justify: "center",
    items: "center",
    context: InputContext,
})

const Button = styled(TButton, {
    context: InputContext,
    justify: "center",
    items: "center",
    variants: {
        size: {
            "...size": (val = "$true") =>
                typeof val === "number"
                    ? { paddingHorizontal: 0, height: val, borderRadius: val * 0.2 }
                    : { paddingHorizontal: 0, height: val },
        },
    },
})

export const InputIconFrame = styled(View, {
    justify: "center",
    items: "center",
    context: InputContext,
    variants: {
        size: {
            "...size": (val, { tokens }) => {
                return {
                    // paddingHorizontal: tokens.space[val],
                }
            },
        },
    },
})

const getIconSize = (size: FontSizeTokens, scale: number) =>
    (typeof size === "number" ? size * 0.5 : getFontSize(size)) * scale

const InputIcon = InputIconFrame.styleable<{
    scaleIcon?: number
    color?: ColorTokens | string
}>(({ children, ...rest }, ref) => {
    const { size = "$true", color: contextColor, scaleIcon = 1 } = InputContext.useStyledContext()
    const theme = useTheme()
    const color = getVariable(
        contextColor || theme[contextColor as any]?.get("web") || theme.color10?.get("web")
    )
    const iconSize = getIconSize(size, scaleIcon)
    const getThemedIcon = useGetThemedIcon({ size: iconSize, color: color as any })

    return <InputIconFrame ref={ref} {...rest}>{getThemedIcon(children)}</InputIconFrame>
})

export const InputContainerFrame = styled(View, {
    context: InputContext,
    flexDirection: "column",
    variants: {
        size: { "...size": () => ({}) },
        color: { "...color": () => ({}) },
        gapScale: { ":number": {} as any },
    },
    defaultVariants: {
        size: "$4",
    },
})

export const InputLabel = styled(Label, {
    context: InputContext,
    variants: {
        size: { "...fontSize": getFontSized as any },
    },
})

export const InputInfo = styled(Text, {
    context: InputContext,
    color: "$color10",
    variants: {
        size: {
            "...fontSize": (val, { font }) => {
                if (!font) return
                return {
                    fontSize: font.size[val].val * 0.8,
                    lineHeight: font.lineHeight?.[val].val * 0.8,
                    fontWeight: font.weight?.["$2"],
                    letterSpacing: font.letterSpacing?.[val],
                    textTransform: font.transform?.[val],
                    fontStyle: font.style?.[val],
                }
            },
        },
    },
})

const InputXGroup = styled(XGroup, { context: InputContext })

export const Input = withStaticProperties(InputContainerFrame, {
    Box: InputGroupImpl,
    Area: InputImpl,
    Section: InputSection,
    Button,
    Icon: InputIcon,
    Info: InputInfo,
    Label: InputLabel,
    XGroup: withStaticProperties(InputXGroup, { Item: XGroup.Item }),
})

