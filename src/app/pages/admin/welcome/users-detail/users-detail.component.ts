import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberService } from 'src/app/services/member.service';
import Swal from 'sweetalert2';
import { UpdateUserDetailComponent } from '../update-user-detail/update-user-detail.component';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  constructor(public dialog: MatDialog, private member:MemberService) { }
  allmember:any=[];
  ngOnInit(): void {
    this.getAllMember();
  }
  getAllMember(){
    this.member.getAllMember().subscribe(
      (data:any)=>{
        this.allmember = data;
      }
    )
  }
  openDialog() {
    this.dialog.open(UpdateUserDetailComponent);
  }

  onDelete(id:number){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // delete
        this.member.deleteUser(id).subscribe(
          (res) => {
            Swal.fire('Deleted', id + ' id is Deleted succefully !!', 'success');
            this.getAllMember();
          },
          (error) => {
            Swal.fire('Error', id + ' id is not Deleted !!', 'error');
          }
        );
      }
    })
  }
}
