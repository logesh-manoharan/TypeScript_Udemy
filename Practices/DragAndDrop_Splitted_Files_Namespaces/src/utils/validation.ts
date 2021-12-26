namespace App {
    export interface Validatable {
        value: string | number,
        required?: boolean,
        minLength?: number,
        maxLength?: number,
        min?: number,
        max?: number
    }

    export function validate (validatableValue: Validatable) {
        let isValid = true;
        // required
        if (validatableValue.required) {
            isValid = isValid && validatableValue.value.toString().trim().length > 0;
        }
        // minLength
        if (validatableValue.minLength != null && typeof validatableValue.value === 'string') {
            isValid = isValid && validatableValue.value.length >= validatableValue.minLength;
        }
        // maxLength
        if (validatableValue.maxLength != null && typeof validatableValue.value === 'string') {
            isValid = isValid && validatableValue.value.length <= validatableValue.maxLength;
        }
        // minValue
        if (validatableValue.min != null && typeof validatableValue.value === 'number') {
            isValid = isValid && validatableValue.value >= validatableValue.min;
        }
        // maxValue
        if (validatableValue.max != null && typeof validatableValue.value === 'number') {
            isValid = isValid && validatableValue.value <= validatableValue.max;
        }

        return isValid;
    }
}