import { FormGroup } from '@angular/forms';

export class FormHelper {
  static isValid(form: FormGroup, field: string): boolean {
    const c = form.get(field);
    return !!(c && (c.touched || c.dirty) && c.valid);
  }

  static isInvalid(form: FormGroup, field: string): boolean {
    const c = form.get(field);
    return !!(c && (c.touched || c.dirty) && c.invalid);
  }

  static getErrorKeys(form: FormGroup, field: string): string[] {
    const control = form.get(field);
    if (!control || !FormHelper.isInvalid(form, field)) return [];
    return Object.keys(control.errors ?? {});
  }
}
