import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../articles.service';
@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.css']
})
export class EditArticlesComponent implements OnInit {

 
  addForm:any;

  vals = ''
  data= this.vals.split(',');
  article_id: any;
  
 
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private articleService:ArticleService,
    private url:ActivatedRoute
    ) {

      this.addForm = this.formBuilder.group({
        id:[],
        title: ['', Validators.required],  
        description: ['', [Validators.required, Validators.maxLength(20)]],  
        published: ['', Validators.required],     
      }
      )
     }

   
     

  ngOnInit(): void {

    this.article_id = this.url.snapshot.params['id'];
    if (this.article_id>0) {
      this.articleService.getSingleArticle(this.article_id).subscribe((
        (data:any)=>{
          //console.log(data.data);
          this.addForm.patchValue(data.data);
          
        }

      ))
    }
    
    
  }





 onEdit(){
   
    // console.log(this.addForm.value)
    this.articleService.editArticle(this.addForm.value).subscribe(
      (data:any)=>{
        console.log(data);
        this.router.navigate(['/']);  
      },  
     error => {  
       alert(error);
     });

  }


}
