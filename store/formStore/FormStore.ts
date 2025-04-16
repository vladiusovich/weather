import { makeObservable, observable, runInAction } from 'mobx';

/**
 * Validator functions map. Each function returns an error message or undefined if valid.
 */
export type Validator<T> = {
    [K in keyof T]?: (value: T[K], values: T) => string | undefined;
};

/**
 * Options for initializing the form store.
 */
export interface FormStoreOptions<T extends Record<string, any>> {
    /** Initial values for all fields */
    initialValues: T;
    /** Optional validators for fields */
    validators?: Validator<T>;
}

/**
 * Universal, generic MobX Form Store for any shape of form values.
 */
export class FormStore<T extends Record<string, any>> {
    /** Current form values */
    values: T;
    /** Validation error messages per field */
    errors: Partial<Record<keyof T, string>> = {};
    /** Tracks touched fields */
    touched: Partial<Record<keyof T, boolean>> = {};
    /** Submission state flags */
    isSubmitting = false;
    isSubmitted = false;

    private initialValues: T;
    private validators: Validator<T>;

    constructor(options: FormStoreOptions<T>) {
        this.initialValues = options.initialValues;
        this.values = { ...options.initialValues };
        this.validators = options.validators || {};

        makeObservable(this, {
            values: observable,
            errors: observable,
            touched: observable,
            isSubmitting: observable,
            isSubmitted: observable,
        });

    }

    /**
     * Set a field value, mark as touched, and re-validate.
     */
    setValue<K extends keyof T>(field: K, value: T[K]) {
        this.values[field] = value;
        this.touched[field] = true;
        this.validateField(field);
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
    validateField<K extends keyof T>(field: K): string | undefined {
        const validator = this.validators[field];
        const value = this.values[field];
        const error = validator ? validator(value, this.values) : undefined;
        if (error) runInAction(() => { this.errors[field] = error; });
        else runInAction(() => { delete this.errors[field]; });
        return error;
    }

    /**
     * Validate all fields. Returns true if no errors.
     */
    validateAll(): boolean {
        (Object.keys(this.values) as (keyof T)[]).forEach((field) => {
            this.validateField(field);
        });
        return Object.keys(this.errors).length === 0;
    }

    /**
     * Mark all fields as touched (e.g., on submit).
     */
    markAllTouched() {
        (Object.keys(this.values) as (keyof T)[]).forEach((field) => {
            this.touched[field] = true;
        });
    }

    /**
     * Submit handler: validates, calls onSubmit callback, and manages state flags.
     */
    async submit(onSubmit: (values: T) => Promise<void>) {
        this.markAllTouched();
        const isValid = this.validateAll();
        if (!isValid) return;

        this.isSubmitting = true;
        try {
            await onSubmit({ ...this.values });
            runInAction(() => { this.isSubmitted = true; });
        } finally {
            runInAction(() => { this.isSubmitting = false; });
        }
    }

    /**
     * Reset form to initial values and clear errors/touched flags.
     */
    reset() {
        this.values = { ...this.initialValues };
        this.errors = {};
        this.touched = {};
        this.isSubmitting = false;
        this.isSubmitted = false;
    }
}
