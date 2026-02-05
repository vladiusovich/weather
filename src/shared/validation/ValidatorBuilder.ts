type RuleName = "required" | "invalid";
type ValidatorFn<T, K extends string> = (value?: T) => K | undefined;
export class ValidatorBuilder<T, R extends string = never> {
    private validators: ValidatorFn<T, string>[] = [];
    private constructor(validators: ValidatorFn<T, string>[]) {
        this.validators = validators;
    }
    static create<U>() {
        return new ValidatorBuilder<U, never>([]);
    }

    /** Overload for internal `RuleName` */
    add<K extends RuleName>(name: K, predicate: (value?: T) => boolean): ValidatorBuilder<T, R | K>;

    /** Overload for any K */
    add<K extends string>(name: K, predicate: (value?: T) => boolean): ValidatorBuilder<T, R | K>;

    /** Generic implementation */
    add<K extends string>(
        name: K,
        predicate: (value?: T) => boolean
    ): ValidatorBuilder<T, R | K> {
        const fn: ValidatorFn<T, K> = (value) => (predicate(value) ? name : undefined);
        return new ValidatorBuilder<T, R | K>([...this.validators, fn as ValidatorFn<T, string>]);
    }
    build(messages: { [P in R]: string }): (value?: T) => string | undefined {
        return (value?: T) => {
            for (const validate of this.validators as ValidatorFn<T, R>[]) {
                const key = validate(value);
                if (key) return messages[key];
            }
            return undefined;
        };
    }
}
