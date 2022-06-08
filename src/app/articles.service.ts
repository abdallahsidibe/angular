import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Article } from './articles';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor( private http: HttpClient) { }

  baseUrl: string = 'http://localhost/phprestAPI/';

  getArticle() {
    return this.http.get<Article[]>(this.baseUrl+'view.php');
  } 

  getSingleArticle(id:any) {
    return this.http.get<Article[]>(this.baseUrl+'view.php?id='+id);
  } 
  
  deleteArticle(id:any) {
    console.log(id);
    return this.http.delete(this.baseUrl+'delete.php?id='+ id);  
  }  

  createArticle(article:any) {
  //  console.log(id);
    return this.http.post(this.baseUrl+'insert.php', article);  
  }  

  editArticle(article:any) {
    //  console.log(id);
      return this.http.put(this.baseUrl+'update.php', article);  
    }  

}
