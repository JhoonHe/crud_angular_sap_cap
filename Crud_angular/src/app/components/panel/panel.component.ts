import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ClientService } from '../../services/client.service';
import { UpdateComponent } from '../user/update/update.component';
import { CreateComponent } from '../user/create/create.component';
import { MatButtonModule } from '@angular/material/button';
import { DeleteComponent } from '../user/delete/delete.component';
import { MatIconModule } from '@angular/material/icon';

interface User {
  document: string,
  name: string,
  last_name: string
}

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CreateComponent, DeleteComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {

  constructor(private client: ClientService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['document', 'name', 'last_name', 'update', 'delete'];
  users: User[] = [];

  ngOnInit(): void {
    this.client.getRequest('api/odata/v4/user/User').subscribe({
      next: (response: any) => {
        this.users = response.value;
      },
      error(error) {
        console.log(error);
      },
      complete: () => console.log('Complete')

    })
  }

  openDialogUpdate(data_user: User) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: data_user
    });

    dialogRef.componentInstance.getEventData.subscribe(() => {
      dialogRef.close();
      this.getDataEvent();
    })
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateComponent);

    dialogRef.componentInstance.getEventData.subscribe(() => {
      dialogRef.close();
      this.getDataEvent();
    })
  }

  getDataEvent(): void {
    this.ngOnInit();
  }
}
