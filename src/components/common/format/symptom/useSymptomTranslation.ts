import { findTranslation } from "@./src/utils/i18n/i18n.helper";
import { useTranslation } from "react-i18next";

type SymptomSearchData = {
    name: string;
    code?: string;
};

export const useSymptomTranslation = () => {
    const { t, i18n } = useTranslation();

    const getTranslate = ({ name, code }: SymptomSearchData) => {
        return findTranslation(
            i18n, t,
            [`common.symptomCodes.${code}`, `common.symptomCodes.${name}`],
            name
        );
    };

    return {
        getTranslate
    };
};

export default useSymptomTranslation;
