import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  columnsToDisplay :  string[] = ['index', 'username', 'email', 'phone', 'skillsets', 'hobby', 'actions'];
  clickedRows = new Set<User>();
  dataSource : MatTableDataSource<User>;
  user? : User;
  firstClicked = false;
  previousId : string | null;
  selectedUser : User;

  constructor(
    private api: ApiService,
    private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100%'
    });

    // Refresh table after adding user
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers () {
    this.api.getUsers().subscribe({
      next:(result) => {
        this.dataSource = new MatTableDataSource(result);

        // Add property to enable editable field when required
        this.dataSource.data.forEach(element => {
            element['isEdit'] = false;
        });
      },
      error:(error) => {
        console.log(error);
        alert("Failed to retrieve user list!");
      }
    });
  }

  onRowClicked(row: User) {
    const index = this.dataSource.data.indexOf(row);
    console.log("Selected = ", this.selectedUser);

    if (!this.previousId) {
      this.previousId = row._id;
      console.log( 'ID = ', this.previousId);
      this.selectedUser = row;
      console.log("First = ", this.selectedUser);
      this.firstClicked = true;
    } else {
      if (this.previousId != row._id) {
          this.selectedUser = row;
          console.log("First2 = ", this.selectedUser);
          this.previousId = row._id;
          console.log( 'ID2 = ', this.previousId);
          this.firstClicked = true;
      } else {
        this.firstClicked = false;
      }
    }

    console.log("Clicked = ", this.firstClicked);
  }

  select(user: User) {
    this.user = user;
    this.user['isEdit'] = true;

    if (!this.previousId) {
      this.previousId = user._id;
      this.selectedUser = user;
      console.log("First = ", this.selectedUser);
      this.firstClicked = true;
    } else {
      if (this.previousId != user._id) {
          this.selectedUser = user;
          console.log("First2 = ", this.selectedUser);
          this.previousId = user._id;
          this.firstClicked = true;
      } else {
        this.firstClicked = false;
      }
    }
  }

  delete(id: string) {
    this.api.deleteUser(id).subscribe({
      next:() => {
        this.dataSource.data = this.dataSource.data.filter((user: User) => {
          return user._id !== id ? user : false;
        })
      },
      error:(error) => {
        console.log(error);
        alert("Failed to delete user!");
      }
    });
  }

  update(user: User) {
    this.api.updateUser(user).subscribe({
      next:() => {
      },
      error:(error) => {
        console.log(error);
        alert("Failed to update user!");
      }
    });
    this.user['isEdit'] = false;
  }

  cancel() {
    // Cancel information update and revert information to previous state
    this.getUsers();
  }
}