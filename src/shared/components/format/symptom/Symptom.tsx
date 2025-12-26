import React from "react";
import useSymptomTranslation from "./useSymptomTranslation";
import Typo from "src/shared/components/ui/typo/Typo";

type BaseSymptomProps = {
    name: string;
    code?: string;
};

type PolymorphicSymptomProps<TAs extends React.ElementType> =
    BaseSymptomProps & {
        as?: TAs;
    } & Omit<React.ComponentPropsWithoutRef<TAs>, keyof BaseSymptomProps | "as">;

const Symptom = <TAs extends React.ElementType = typeof Typo.Text>(
    props: PolymorphicSymptomProps<TAs>,
) => {
    const { getTranslate } = useSymptomTranslation();
    const { name, code, as } = props;
    const Component = as || Typo.Text;

    const text = getTranslate({ name, code });

    return <Component {...props}>{text}</Component>;
};

export default Symptom;