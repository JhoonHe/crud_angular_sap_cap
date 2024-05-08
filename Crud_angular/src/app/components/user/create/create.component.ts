import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  @Output() getEventData = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private client: ClientService) {
    this.form = this.fb.group({
      document: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.client.postRequest('api/odata/v4/user/User', this.form.value).subscribe({
        next: (response: any) => {
          console.log(response);
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
