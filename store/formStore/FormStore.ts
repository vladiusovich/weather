import { computed, makeObservable, observable, runInAction, toJS } from 'mobx';

/**
 * Validator functions map. Each function returns an error message or undefined if valid.
 */

export type Validator<T> = {
    [K in keyof T]?: (value?: T[K]) => string | undefined;
};

/**
 * Options for initializing the form store.
 */
export interface FormStoreOptions<T extends Record<string, any>> {
    /** Initial values for all fields */
    // initialValues: T;
    /** Optional validators for fields */
    // validators?: Validator<T>;
}

/**
 * Universal, generic MobX Form Store for any shape of form values.
 */
export abstract class FormStore<T extends Record<string, any>> {
    /** Current form values */
    values: T = {} as T;
    /** Validation error messages per field */
    errors: Partial<Record<keyof T, string>> = {};
    /** Tracks touched fields */
    touched: Partial<Record<keyof T, boolean>> = {};

    disabled: Partial<Record<keyof T, boolean>> = {};

    /** Submission state flags */
    isSubmitting = false;
    isSubmitted = false;

    private initialValues: T = {} as T;
    private validators: Validator<T> = {} as Validator<T>;

    constructor(options?: FormStoreOptions<T>) {
        // this.initialValues = options.initialValues;

        makeObservable(this, {
            values: observable,
            errors: observable,
            touched: observable,
            disabled: observable,
            hasError: computed,
            isSubmitting: observable,
            isSubmitted: observable,
        });

        this.reset();
    }

    /**
     * Set a field value, mark as touched, and re-validate.
     */
    setValue<K extends keyof T>(field: K, value: T[K]) {
        runInAction(() => {
            this.values[field] = value;
            this.touched[field] = true;
        });

        this.validateField(field);
    }

    toggleFieldDisabled<K extends keyof T>(field: K, state: boolean) {
        runInAction(() => {
            this.disabled[field] = state;
        });
    }

    /**
     * Get a field value.
     */
    getValue<K extends keyof T>(field: K): T[K] {
        return this.values[field];
    }

    /**
     * Validate a single field using its validator (if provided).
     * Stores and returns the error message.
     */
    validateField<K extends keyof T>(field: K) {
        const validator = this.validators[field];
        const value = this.values[field];
        const error = validator ? validator(value) : undefined;
        if (error) {
            runInAction(() => {
                this.errors[field] = error;
            });
        } else {
            runInAction(() => {
                delete this.errors[field];
            })
        };
    }

    public get hasError() {
        return Object.keys(this.errors).length !== 0;
    }

    /**
     * Validate all fields. Returns true if no errors.
     */
    validateAll(): boolean {
        const keys = Object.keys(this.validators) as (keyof T)[];
        keys.forEach((field) => {
            this.validateField(field);
        });
        return Object.keys(this.errors).length === 0;
    }

    /**
     * Mark all fields as touched (e.g., on submit).
     */
    markAllTouched() {
        (Object.keys(this.validators) as (keyof T)[]).forEach((field) => {
            runInAction(() => {
                this.touched[field] = true;
            });
        });
    }

    abstract submit(): Promise<void>;

    /**
     * Submit handler: validates, calls onSubmit callback, and manages state flags.
     */
    public async handleSubmit(): Promise<void> {
        this.markAllTouched();
        const isValid = this.validateAll();
        if (!isValid) return;

        this.isSubmitting = true;
        try {
            await this.submit();
            runInAction(() => {
                this.isSubmitted = true;
            });
        } finally {
            runInAction(() => {
                this.isSubmitting = false;
            });
        }
    }

    protected async initValidation(validators: Partial<Validator<T>>) {
        runInAction(() => {
            this.validators = validators;
        });
    }

    /**
     * Reset form to initial values and clear errors/touched flags.
     */
    reset() {
        runInAction(() => {
            this.values = { ...this.initialValues };
            this.errors = {};
            this.touched = {};
            this.disabled = {};
            this.isSubmitting = false;
            this.isSubmitted = false;
        });
    }
}
