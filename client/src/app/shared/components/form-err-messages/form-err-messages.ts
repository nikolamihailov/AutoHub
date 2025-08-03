import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-err-messages',
  template: `
    @if (isInvalid) {
    <div class="validation-message">
      @for (err of errorKeys; track err) {
      <span>{{ getErrorMessage(err) }}</span>
      }
    </div>
    }
  `,
})
export class FormErrMessagesComponent {
  @Input() form!: FormGroup;
  @Input() field!: string;
  @Input() messages!: Record<string, string>;

  get isInvalid(): boolean {
    const control = this.form.get(this.field);
    return !!(control && (control.touched || control.dirty) && control.invalid);
  }

  get errorKeys(): string[] {
    const control = this.form.get(this.field);
    if (!control || !this.isInvalid) return [];
    return Object.keys(control.errors ?? {});
  }

  getErrorMessage(error: string): string {
    return this.messages?.[error] ?? error;
  }
}
