import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-species-mgmt',
  templateUrl: './species-mgmt.component.html',
  styleUrls: ['./species-mgmt.component.scss']
})
export class SpeciesMgmtComponent implements OnInit {
  specieslist:any
  constructor(
    private authService :AuthService,
    private toast:ToastrService,
    private route:Router
  ) { }

  ngOnInit() {
    this.listofSpecies()
  }

  listofSpecies(){
    // this.authService.getSpeciesList().subscribe(res=>{
    //   if(res && res['status']==200){
    //     this.specieslist = res['data']
    //   }
    // })
  }
  deleteSpecies(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Species will be Deleted Parmenantly',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.authService.deleteAdmin(id).subscribe((res) => {
          if (res && res['status'] == 200) {
            this.toast.success(res['message'])
          }
          this.toast.warning(res['message'])
        })
      }
    })

  }
}
