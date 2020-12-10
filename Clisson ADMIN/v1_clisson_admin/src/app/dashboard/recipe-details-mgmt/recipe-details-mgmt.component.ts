import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-recipe-details-mgmt',
  templateUrl: './recipe-details-mgmt.component.html',
  styleUrls: ['./recipe-details-mgmt.component.scss']
})
export class RecipeDetailsMgmtComponent implements OnInit {
  recipe: any = [];
  imgurl = `${environment.api.baseurlImg}`
  total_records: any
  pageNo: number = 1
  search :any
  constructor(private route: Router,
    private authService: AuthService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.recipeList(this.pageNo);
  }
  recipeList(pageNo) {
    this.authService.getRecipeList(pageNo).subscribe(res => {
      if (res && res['status'] == 200) {
        this.recipe = res['data']
        this.total_records = res['totalRecords']
      }
    })
  }
  onChangeStatus(event, id) {

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Le statut de Varity sera changé!",
      showCancelButton: true,
      confirmButtonText: 'Oui, changez-le!',
      cancelButtonText: "Non, garde-le"
    }).then((result) => {
      let temp;
      if (result.value == true) {
        if (event == 0) {
          temp = 1
        }
        else {
          temp = 0;
        }
        let obj = {
          'id': JSON.parse(id),
          'status': JSON.stringify(temp)
        }
        this.authService.changeReciepeStatus(obj).subscribe((res) => {
          if (res && res['status'] == 200) {
            this.toast.success(res['message']);
            this.ngOnInit();
          }
          else {
            this.toast.warning(res['message']);
            this.ngOnInit();
          }
        })
      }
      else {
        this.ngOnInit();
      }
    })
  }

  onDeleteConfirm(id) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "La recette sera supprimée",
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: "Non, garde-le"
    }).then((result) => {
      if (result.value == true) {
        this.authService.deleteRecipe(id).subscribe((res) => {
          if (res && res['status'] == 200) {
            this.toast.success(res['message'])
            this.ngOnInit();
          }
          else {
            this.toast.warning(res['message'])
          }
        })
      }
      else {
        this.ngOnInit();
      }
    })
  }
  serchRecord(term) {
    if(term.length > 1){
      this.search = true
      this.authService.searchRecord(term).subscribe(res => {
        if (res && res['status'] == 400) {
          this.recipe = res['data'].recipe
          if(this.recipe && this.recipe.length > 0){
            for (let i = 0; i < this.recipe.length; i++) {
              this.recipe[i] = {
                picture: this.recipe[i].image,
                name : this.recipe[i].name,
                varieties_used:this.recipe[i].varieties_used,
                number_of_persons:this.recipe[i].number_of_persons,
                status:this.recipe[i].status
              }
            }
          }
        }
      })
    }  
    else{
      this.ngOnInit()
      this.search = false
    }

  }
  shortRecord() {
    this.recipe.sort((b, a) => 0 - (a > b ? -1 : 1));
  }
}
