import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { UiSwitchModule } from 'ngx-ui-switch';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminmanagementComponent } from './adminmanagement/adminmanagement.component';
import { VarietyCategoryMgmtComponent } from './variety-category-mgmt/variety-category-mgmt.component';
import { VarietyDetailsMgmtComponent } from './variety-details-mgmt/variety-details-mgmt.component';
import { RecipeDetailsMgmtComponent } from './recipe-details-mgmt/recipe-details-mgmt.component';
import { CropAdvicesDetailsMgmtComponent } from './crop-advices-details-mgmt/crop-advices-details-mgmt.component';
import { SpeciesMgmtComponent } from './species-mgmt/species-mgmt.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAdminComponent } from './adminmanagement/add-admin/add-admin.component';
import { UpdatAdminComponent } from './adminmanagement/updat-admin/updat-admin.component';
import { AddVarietyCategoryComponent } from './variety-category-mgmt/add-variety-category/add-variety-category.component';
import { UpdateVarietyCategoryComponent } from './variety-category-mgmt/update-variety-category/update-variety-category.component';
import { UpdateVarietyDerailsComponent } from './variety-details-mgmt/update-variety-derails/update-variety-derails.component';
import { AddVarietyDerailsComponent } from './variety-details-mgmt/add-variety-derails/add-variety-derails.component';
import { UpdateRecipeDetailsComponent } from './recipe-details-mgmt/update-recipe-details/update-recipe-details.component';
import { AddRecipeDetailsComponent } from './recipe-details-mgmt/add-recipe-details/add-recipe-details.component';
import { AddCropAdviceComponent } from './crop-advices-details-mgmt/add-crop-advice/add-crop-advice.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import {QuillModule} from 'ngx-quill';
import { NgSelectModule,NgOption } from '@ng-select/ng-select';
import { EditCropAdviceComponent } from './crop-advices-details-mgmt/edit-crop-advice/edit-crop-advice.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        UiSwitchModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        FileUploadModule,
        QuillModule.forRoot(),
        NgSelectModule
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        AdminmanagementComponent,
        VarietyCategoryMgmtComponent,
        VarietyDetailsMgmtComponent,
        RecipeDetailsMgmtComponent,
        CropAdvicesDetailsMgmtComponent,
        SpeciesMgmtComponent,
        UpdatAdminComponent,
        AddVarietyCategoryComponent,
        UpdateVarietyCategoryComponent,
        AddAdminComponent,
        UpdateVarietyDerailsComponent,
        AddVarietyDerailsComponent,
        UpdateRecipeDetailsComponent,
        AddRecipeDetailsComponent,
        AddCropAdviceComponent,
        EditCropAdviceComponent,
        

    ],
    providers: [],
})
export class DashboardModule { }
