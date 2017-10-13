import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {PostsProvider} from '../providers/posts/posts';
import {HttpClientModule} from "@angular/common/http";
import {DataProvider} from '../providers/data/data';
import {AddPostPage} from "../pages/add-post/add-post";
import {ViewPostPage} from "../pages/view-post/view-post";
import {CommentsProvider} from '../providers/comments/comments';
import {AddCommentPage} from "../pages/add-comment/add-comment";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPostPage,
    ViewPostPage,
    AddCommentPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewPostPage,
    AddPostPage,
    AddCommentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PostsProvider,
    DataProvider,
    CommentsProvider
  ]
})
export class AppModule {
}
