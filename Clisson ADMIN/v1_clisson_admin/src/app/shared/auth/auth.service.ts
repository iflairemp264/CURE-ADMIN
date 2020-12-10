import { Router } from '@angular/router';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import * as moment from "moment";
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthService {
  token: any

  private url = `${environment.api.baseurl}`;
  constructor(private http: HttpClient,
    private route: Router, private toast: ToastrService) { }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
  }

  logout() {
    localStorage.removeItem('_token');
    this.route.navigate(['/pages/login']);
    this.toast.success('Logout Success');
    return true
  }
  login(obj) {
    return this.http.post(`${this.url}/user/login`, obj)
      .pipe(catchError(this.handleError));

  }
  changePassword(obj) {
    return this.http.post(`${this.url}/user/changePwd`, obj)
      .pipe(catchError(this.handleError));

  }
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }
  getToken() {
    return this.token = localStorage.getItem('_token');
  }

  isAuthenticated() {
    if (this.getToken()) {
      return true
    }
    else {

      this.route.navigate(['/pages/login'])
      return false
    }
  }

  //ADMIN MODULE
  getUsers(pageNo) {
    return this.http.post(`${this.url}/user/list`,{pageNo})
      .pipe(catchError(this.handleError));

  }
  addUser(data) {
    return this.http.post(`${this.url}/user/add`, data)/* `${this.options}`, */
      .pipe(catchError(this.handleError));
  }
  changeAdminStatus(obj) {

    return this.http.post(`${this.url}/user/changeStatus`, obj)
      .pipe(catchError(this.handleError));
  }
  deleteAdmin(id) {
    return this.http.post(`${this.url}/user/delete`, { id })
      .pipe(catchError(this.handleError));
  }
  updateAdmin(obj) {
    return this.http.post(`${this.url}/user/update`, obj)
      .pipe(catchError(this.handleError));
  }

  // VERIETYCATEGORY MODULE
  getVarietyCategoryList(pageNo) {
    return this.http.post(`${this.url}/varietyCategory/list`, {pageNo})
      .pipe(catchError(this.handleError));
  }
  getVarietyCategoryList1() {
    return this.http.post(`${this.url}/varietyCategory/list`, {})
      .pipe(catchError(this.handleError));
  }
  deleteVarietyCategory(id) {
    return this.http.post(`${this.url}/varietyCategory/delete`, { id })
      .pipe(catchError(this.handleError));
  }
  editVarietyCategory(obj) {
    return this.http.post(`${this.url}/varietyCategory/edit`, obj)
      .pipe(catchError(this.handleError));
  }
  changeVarietyCategoryStatus(obj) {
    return this.http.post(`${this.url}/varietyCategory/changeStatus`, obj)
      .pipe(catchError(this.handleError));
  }

  // VERIETY MODULE
  getVarietyList1() {
    return this.http.post(`${this.url}/variety/list`, [])
      .pipe(catchError(this.handleError));
  }
  getVarietyList(pageNo) {
    return this.http.post(`${this.url}/variety/list`, { pageNo })
      .pipe(catchError(this.handleError));
  }
  deleteVariety(id) {

    return this.http.post(`${this.url}/variety/delete`, { id })
      .pipe(catchError(this.handleError));
  }
  addVariety(obj, obj2) {
    return this.http.post(`${this.url}/variety/add`, obj, obj2)
      .pipe(catchError(this.handleError));
  }
  editVariety(obj) {
    return this.http.post(`${this.url}/variety/edit`, obj)
      .pipe(catchError(this.handleError));
  }
  changeVarietyStatus(obj) {

    return this.http.post(`${this.url}/variety/changeStatus`, obj)
      .pipe(catchError(this.handleError));
  }
  getvarityByCategory(category_id) {
    return this.http.post(`${this.url}/variety/listByCategory`, category_id)
      .pipe(catchError(this.handleError));
  }
  getAllVarietyByCategory(id) {
    return this.http.post(`${this.url}/calc/listByCategory`, id)
      .pipe(catchError(this.handleError));
  }
  // RECIPE MODULE

  getRecipeList(pageNo) {
    return this.http.post(`${this.url}/recipe/list`, { pageNo })
      .pipe(catchError(this.handleError));
  }
  getAllRecipe() {
    return this.http.post(`${this.url}/recipe/AllList`, {})
      .pipe(catchError(this.handleError));
  }
  /* */
  deleteRecipe(id) {
    return this.http.post(`${this.url}/recipe/delete`, { id })
      .pipe(catchError(this.handleError));
  }
  addRecipe(obj, obj2) {
    return this.http.post(`${this.url}/recipe/add`, obj, obj2)
      .pipe(catchError(this.handleError));
  }
  editRecipe(obj) {
    return this.http.post(`${this.url}/recipe/edit`, obj)
      .pipe(catchError(this.handleError));
  }
  changeReciepeStatus(obj) {
    return this.http.post(`${this.url}/recipe/changeStatus`, obj)
      .pipe(catchError(this.handleError));
  }

  //CROPADVICE MODULE
  getCropadvice(pageNo) {
    return this.http.post(`${this.url}/cropadvice/list`, { pageNo })
      .pipe(catchError(this.handleError));
  }
  addCropAdvice(obj) {
    return this.http.post(`${this.url}/cropAdvice/add`, obj)
      .pipe(catchError(this.handleError));
  }
  /* cropAdvice/emptyCropAdviceList */
  emptyCropAdviceList() {
    return this.http.post(`${this.url}/cropAdvice/emptyCropAdviceList`, [])
      .pipe(catchError(this.handleError));
  }
  /* cropAdvice/changeStatus */
  cropadviceStatus(obj) {
    return this.http.post(`${this.url}/cropAdvice/changeStatus`, obj)
      .pipe(catchError(this.handleError));
  }
  /* Delete crop Advice */
  deleteCropAdvice(id) {
    return this.http.post(`${this.url}/cropAdvice/delete`, {id})
      .pipe(catchError(this.handleError));
  }
  //Details API
  adminDetails(id) {
    return this.http.post(`${this.url}/user/details`, { id })
      .pipe(catchError(this.handleError));
  }

  varietyDetail(id) {
    return this.http.post(`${this.url}/variety/details`, { id })
      .pipe(catchError(this.handleError));
  }

  vaietyCategoryDetails(id) {
    return this.http.post(`${this.url}/varietyCategory/details`, { id })
      .pipe(catchError(this.handleError));
  }
  cropadviceDetails(id) {
    return this.http.post(`${this.url}/cropAdvice/details`, { id })
      .pipe(catchError(this.handleError));
  }
  recipeDetails(id) {
    return this.http.post(`${this.url}/recipe/details`, { id })
      .pipe(catchError(this.handleError));
  }

  //GET LENGTH OF RECORD

  varietyPageSize() {
    return this.http.post(`${this.url}/variety/getSize`, {})
      .pipe(catchError(this.handleError));

  }


  searchRecord(term) {
    return this.http.post(`${this.url}/species/search`, {term})
      .pipe(catchError(this.handleError));
  }
  /* Handle Global Error */
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}


// CREATE TABLE species(species_id varchar(10), name VARCHAR(20), image VARCHAR(20));