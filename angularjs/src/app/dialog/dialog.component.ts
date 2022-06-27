import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  addForm !: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private api: ApiService) {
      this.addForm = this.formBuilder.group({
        username : ['', Validators.required],
        email : ['', Validators.required],
        phone : ['', Validators.required],
        skillsets : ['', Validators.required],
        hobby : ['', Validators.required]
      })
    }

  ngOnInit(): void {
  }

  addUser(){
    if (this.addForm.valid) {
      this.api.register(this.addForm.value).subscribe({
        next:() => {
          alert("User registration is successful");
          this.addForm.reset();
          this.dialogRef.close();
        },
        error:(error: any) => {
          console.log(error);
          alert("Failed to create user");
        }
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
