import { ValidationResult, ValidationRule } from '../types/common.types';

export class Validator {
  private static _validate(rules: ValidationRule[]): ValidationResult {
    const errors = rules
      .filter(({ check }) => !check())
      .map(({ error }) => error);

    return errors.length ? errors : true;
  }

  static first_name(value: string): ValidationResult {
    return this._validate([
      { check: () => !!value && value.length > 0, error: 'First name cannot be empty' },
      { check: () => /^[A-ZА-ЯЁ]/.test(value), error: 'First name must start with a capital letter' },
      { check: () => !/\s/.test(value), error: 'First name must not contain spaces' },
      { check: () => !/\d/.test(value), error: 'First name must not contain digits' },
      { check: () => !/[^A-Za-zА-ЯЁа-яё-]/.test(value), error: 'First name contains invalid characters (only hyphen is allowed)' },
    ]);
  }

  static second_name(value: string): ValidationResult {
    return this.first_name(value);
  }

  static login(value: string): ValidationResult {
    return this._validate([
      { check: () => /^[A-Za-z0-9_-]+$/.test(value), error: 'Login can only contain Latin letters, digits, hyphens, and underscores' },
      { check: () => /[A-Za-z]/.test(value), error: 'Login cannot consist of digits only' },
      { check: () => !/\s/.test(value), error: 'Login must not contain spaces' },
      { check: () => value.length >= 3 && value.length <= 20, error: 'Login must be between 3 and 20 characters' },
      { check: () => !!value && value.length > 0, error: 'Login cannot be empty' },
    ]);
  }

  static email(value: string): ValidationResult {
    return this._validate([
      { check: () => /^[A-Za-z0-9._-]+@[A-Za-z0-9_-]+\.[A-Za-z]{2,}$/.test(value), error: 'Invalid email format' },
      { check: () => !!value && value.length > 0, error: 'Email cannot be empty' },
    ]);
  }

  static password(value: string): ValidationResult {
    return this._validate([
      { check: () => /[A-Z]/.test(value), error: 'Password must contain at least one uppercase letter' },
      { check: () => /\d/.test(value), error: 'Password must contain at least one digit' },
      { check: () => value.length >= 8 && value.length <= 40, error: 'Password must be between 8 and 40 characters' },
      { check: () => !!value && value.length > 0, error: 'Password cannot be empty' },
    ]);
  }

  static oldPassword(value: string): ValidationResult {
    return this._validate([
      { check: () => /[A-Z]/.test(value), error: 'Password must contain at least one uppercase letter' },
      { check: () => /\d/.test(value), error: 'Password must contain at least one digit' },
      { check: () => value.length >= 8 && value.length <= 40, error: 'Password must be between 8 and 40 characters' },
      { check: () => !!value && value.length > 0, error: 'Password cannot be empty' },
    ]);
  }

  static newPassword(value: string): ValidationResult {
    return this._validate([
      { check: () => /[A-Z]/.test(value), error: 'Password must contain at least one uppercase letter' },
      { check: () => /\d/.test(value), error: 'Password must contain at least one digit' },
      { check: () => value.length >= 8 && value.length <= 40, error: 'Password must be between 8 and 40 characters' },
      { check: () => !!value && value.length > 0, error: 'Password cannot be empty' },
    ]);
  }

  static phone(value: string): ValidationResult {
    return this._validate([
      { check: () => /^\+?\d{10,15}$/.test(value), error: 'Phone number must contain 10 to 15 digits, can start with +' },
      { check: () => !!value && value.length > 0, error: 'Phone number cannot be empty' },
    ]);
  }

  static message(value: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return ['Message must not be empty'];
    }

    return true;
  }

  static tag(value: string): ValidationResult {
    if (value.trim().length > 8) {
      return ['We need a shorter tag'];
    }

    return true;
  }
}
