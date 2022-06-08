import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../articles.service';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.css']
})
export class AddArticlesComponent implements OnInit {
  addForm:any;

  vals = ''
  data= this.vals.split(',');
 
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private articleService:ArticleService
    ) {

      this.addForm = this.formBuilder.group({
        title: ['', Validators.required],  
        description: ['', [Validators.required, Validators.maxLength(20)]],  
        published: ['', Validators.required],    
        
      }
      )
     }

  
     ngOnInit(): void {
      //this.setAutorized(this.data)
    }
   
  

  onSubmit(){
   
    // console.log(this.addForm.value)
    this.articleService.createArticle(this.addForm.value).subscribe(
      (data:any)=>{
        this.router.navigate(['/']);  
      },  
     error => {  
       alert(error);
     });

  }


}
