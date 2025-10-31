import React from "react";
import Typo from "@/components/ui/typo/Typo";
import { useTranslation } from "react-i18next";
import { findTranslation } from "@/utils/i18n/resolveI18nFallback";

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
    const { name, code, as, ...rest } = props;

    const { t, i18n } = useTranslation();
    const Component = as || Typo.Text;

    const text = findTranslation(
        i18n, t,
        [`common.symptomCodes.${code}`, `common.symptomCodes.${name}`],
        name
    );

    return <Component {...rest}>{text}</Component>;
};

export default Symptom;