import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { AdminmanagementComponent } from './adminmanagement/adminmanagement.component';
import { VarietyCategoryMgmtComponent } from './variety-category-mgmt/variety-category-mgmt.component';
import { VarietyDetailsMgmtComponent } from './variety-details-mgmt/variety-details-mgmt.component';
import { RecipeDetailsMgmtComponent } from './recipe-details-mgmt/recipe-details-mgmt.component';
import { CropAdvicesDetailsMgmtComponent } from './crop-advices-details-mgmt/crop-advices-details-mgmt.component';
import { SpeciesMgmtComponent } from './species-mgmt/species-mgmt.component';
import { AddAdminComponent } from './adminmanagement/add-admin/add-admin.component';
import { UpdatAdminComponent } from './adminmanagement/updat-admin/updat-admin.component';
import { AddVarietyCategoryComponent } from './variety-category-mgmt/add-variety-category/add-variety-category.component';
import { UpdateVarietyCategoryComponent } from './variety-category-mgmt/update-variety-category/update-variety-category.component';
import { AddVarietyDerailsComponent } from './variety-details-mgmt/add-variety-derails/add-variety-derails.component';
import { UpdateVarietyDerailsComponent } from './variety-details-mgmt/update-variety-derails/update-variety-derails.component';
import { AddRecipeDetailsComponent } from './recipe-details-mgmt/add-recipe-details/add-recipe-details.component';
import { UpdateRecipeDetailsComponent } from './recipe-details-mgmt/update-recipe-details/update-recipe-details.component';
import { AddCropAdviceComponent } from './crop-advices-details-mgmt/add-crop-advice/add-crop-advice.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { EditCropAdviceComponent } from './crop-advices-details-mgmt/edit-crop-advice/edit-crop-advice.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard1Component,
    data: {
      title: 'Tableau de bord'
    },
    
  },
  {
    path: 'admin',
    component: AdminmanagementComponent,
    data: {
      title: 'Admin'
    },
  },
  {
    path: 'admin/add',
    component: AddAdminComponent,
    data: {
      title: 'Ajouter un administrateur'
    },
  },
  {
    path: 'admin/edit',
    component: UpdatAdminComponent,
    data: {
      title: "Modifier l'administrateur"
    },
  },
  // {
  //   path: 'species',
  //   component: SpeciesMgmtComponent,
  //   data: {
  //     title: 'Crop Advices Details'
  //   }
  // },
  {
    path: 'varietycategory',
    component: VarietyCategoryMgmtComponent,
    data: {
      title: 'Variety Category'
    }
  },
  {
    path: 'varietycategory/edit',
    component: UpdateVarietyCategoryComponent,
    data: {
      title: 'Add Variety Category '
    }
  },
  {
    path: 'varietycategory/add',
    component: AddVarietyCategoryComponent,
    data: {
      title: ' Add Variety Category '
    }
  },
  {
    path: 'variety',
    component: VarietyDetailsMgmtComponent,
    data: {
      title: 'Variety Details'
    }
  },
  {
    path: 'variety/add',
    component: AddVarietyDerailsComponent,
    data: {
      title: 'Add Variety Details'
    }
  },
  {
    path: 'variety/edit',
    component: UpdateVarietyDerailsComponent,
    data: {
      title: 'Edit Variety Details'
    }
  },
  {
    path: 'recipe',
    component: RecipeDetailsMgmtComponent,
    data: {
      title: 'Recipe Details'
    }
  },
  {
    path: 'recipe/add',
    component: AddRecipeDetailsComponent,
    data: {
      title: 'Add Variety Details'
    }
  },
  {
    path: 'recipe/edit',
    component: UpdateRecipeDetailsComponent,
    data: {
      title: 'Edit Variety Details'
    }
  },
  {
    path: 'cropadvice',
    component: CropAdvicesDetailsMgmtComponent,
    data: {
      title: 'Crop Advices Details'
    }
  },
  {
    path: 'cropadvice/add',
    component: AddCropAdviceComponent,
    data: {
      title: ' Add Crop Advices Details'
    }
  },
  {
    path: 'cropadvice/edit',
    component: EditCropAdviceComponent,
    data: {
      title: ' Edit Crop Advices Details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
