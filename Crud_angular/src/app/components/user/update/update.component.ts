import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  @Output() getEventData = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private client: ClientService, @Inject(MAT_DIALOG_DATA) public data: { document: string, name: string, last_name: string }) {
    this.form = this.fb.group({
      document: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required]
    });

    this.form.patchValue({
      document: data.document,
      name: data.name,
      last_name: data.last_name
    })

    this.form.controls['document'].disable();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.client.patchRequest(`api/odata/v4/user/User('${this.data.document}')`, { name: this.form.value.name, last_name: this.form.value.last_name }).subscribe({
        next: (response: any) => {
          this.getEventData.emit();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('Complete'),
      })
    }
  }
}
