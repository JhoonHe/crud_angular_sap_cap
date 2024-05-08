import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  @Input() document: string = '';
  @Output() getEventData = new EventEmitter<void>();

  constructor(private client: ClientService) { }

  delete(): void {
    this.client.deleteRequest(`api/odata/v4/user/User('${this.document}')`).subscribe({
      next: (response: any) => {
        this.getEventData.emit();
      },
      error(error) {
        console.log(error);

      },
      complete: () => console.log('Complete'),

    })
  }
}
