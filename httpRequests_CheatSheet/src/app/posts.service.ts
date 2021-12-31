import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  errorSubject = new Subject<string>();

  //SUBSCRIBE HERE ONLY IF THE COMPONENT(S) DOESNT CARE ABOUT THE RESULT OF REQUEST
  //ELSE JUST RETURN THE OBSERVABLE AND DEAL WITH IT IN COMPONENT.
  constructor(private http: HttpClient) { }

  createAndStorePost(postData: Post) {
    //auto-converts objects to json data, only send if you subscribe
    this.http.post<{ name: string }>('https://udemy-angular-ad65c-default-rtdb.firebaseio.com/posts.json', postData,
    {
      observe: 'response'
    }).subscribe(
      (responseData) => {
        console.log(responseData)
      }
    ), error => {
      this.errorSubject.next(error.message)
    }
  }

  //COM BETWEEN SERVICE AND COMPONENT. A) SUBJECT.next() and then listen, good for multiple places B)THIS
  fetchPosts() {
    let searchParams = new HttpParams()
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('custom', 'key')

    return this.http.get<{[key: string]: Post}>("https://udemy-angular-ad65c-default-rtdb.firebaseio.com/posts.json",
    {headers: new HttpHeaders({'Custom-header': 'hello'}),
    params: searchParams,
    responseType: 'json' //default
    })
    .pipe(
      map((responseData: {[key: string]: Post}) => {
        const postsArray: Post[] = []
        for(const key in responseData){
          if(responseData.hasOwnProperty(key))
          {
            postsArray.push({...responseData[key], id: key})
          }
        }
        return postsArray
      }),
      catchError(errorRes => {
        // send to analytics server... for example
        //usefull for handling generic tasks
        return throwError(errorRes)
      })
    )
  }

  deletePosts() {
    return this.http.delete("https://udemy-angular-ad65c-default-rtdb.firebaseio.com/posts.json",
    {
      observe: 'events', //default body
      responseType: 'text'
    }
    ).pipe(tap(event => {
      console.log(event)
      if(event.type === HttpEventType.Sent) {
        console.log("delete post sent")
      }
      if(event.type === HttpEventType.Response) {
        console.log(event.body)
      }
    }));
  }
}
