import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    //subject base error forwarding.
   this.errorSub = this.postService.errorSubject.subscribe(errorMessage => {
      this.error = errorMessage
    })

    this.onFetchPosts()
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData)
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe((postArr) => {
      this.isFetching = false;
      this.loadedPosts = postArr
    }, error => {
      this.isFetching = false;
      this.error = error.message
      console.log(error)
    })
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  onHandleError() 
  {
    this.error = null
  }
    
  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }

}
