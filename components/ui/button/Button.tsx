import { SizeTokens, TokensParsed } from "@tamagui/web";
import { FunctionComponent } from "react";
import { Button as UiButton, ButtonProps, getTokens, Spinner } from "tamagui";

type InputComponentIconProps = { color?: any; size?: any }
type IconProp = JSX.Element | FunctionComponent<InputComponentIconProps> | null

export interface IMnButtonProps extends ButtonProps {
    loading?: boolean
    loadingIcon?: IconProp
    loadingIconAligment?: "left" | "right"
    square?: boolean
}

export const getSquareShapeSize = (size: number | SizeTokens | undefined, { tokens }: { tokens: TokensParsed }) => {
    const map = tokens.size as unknown as Record<string, number>;
    const width = map[size as string] ?? size;
    const height = map[size as string] ?? size;

    return {
        width,
        height,
        minWidth: width,
        maxWidth: width,
        maxHeight: height,
        minHeight: height,
        padding: 0,
    };
};

const getShapeSize = ({
    size,
    tokens,
    shape,
}: {
    size: number | SizeTokens | undefined
    tokens: TokensParsed
    shape?: "square"
}) => {
    if (!shape) {
        return {};
    }

    return getSquareShapeSize(size, {
        tokens,
    });
};

const Button = (props: IMnButtonProps) => {
    const {
        loading = false,
        loadingIconAligment,
        children,
        square = false,
        ...rest
    } = props;

    const size = props.size || (props.unstyled ? undefined : "$true");

    const tokens = getTokens({ prefixed: true });
    const shapeSize = getShapeSize({
        size,
        tokens,
        shape: square ? "square" : undefined,
    });

    const loadingIcon = props?.loadingIcon ?? Spinner;

    return (
        <UiButton
            size={size}
            {...rest}
            disabled={loading}
            {...(loading
                ? loadingIconAligment === "left"
                    ? { left: loadingIcon, opacity: 0.5 }
                    : { iconAfter: loadingIcon, opacity: 0.5 }
                : {})}
            {...(square && shapeSize)}
        >
            {children}
        </UiButton>
    );
};

export default Button;