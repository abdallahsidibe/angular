import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../articles.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  articles: any;

  constructor( private articleservice: ArticleService) { }

  ngOnInit(): void {

    this.articleservice.getArticle().subscribe(
      (result:any)=>{
        //console.log(result)
        this.articles =  result.data;
      }
    )

  }

  deleteArticle(article:any){
   // console.log(id);
    this.articleservice.deleteArticle(article.id).subscribe(data=>{
      this.articles = this.articles.filter((u: any) => u !== article);
    })
  }

}
