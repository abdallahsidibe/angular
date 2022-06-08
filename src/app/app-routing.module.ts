import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticlesComponent } from './add-articles/add-articles.component';
import { EditArticlesComponent } from './edit-articles/edit-articles.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';


export const routes: Routes = [
    
    { path: '', component: ListArticlesComponent, pathMatch: 'full' },
    { path: 'add-Article', component: AddArticlesComponent },
    { path: 'edit/:id', component: EditArticlesComponent },

];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
  })

  export class AppRoutingModule { }

