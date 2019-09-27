import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './make-order/form/form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationModule } from './shared/validation/validation.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedService } from './shared/shared.service';
import { ContactComponent } from './contact/contact.component';
import { CookiesComponent } from './shared/pages/cookies/cookies.component';
import { PersonalDataComponent } from './shared/pages/personal-data/personal-data.component';
import { EnvironmentConfig } from './shared/environment.config';
import { HttpModule } from '@angular/http';
import { AuthComponent } from './login/auth/auth.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleItemComponent } from './articles/article-item/article-item.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';

const appRoutes: Routes = [
  { path: 'poptavka', component: MakeOrderComponent, data: { title: 'Vytvoření poptavky' }},
  { path: 'cookies', component: CookiesComponent, data: { title: 'Zasady pouzivani cookies' } },
  { path: 'ochrana-osobnich-udaju', component: PersonalDataComponent , data: { title: 'Ochrana osobnich udaju' }},
  { path: 'add-new-toys', component: AuthComponent, data: { title: 'Administrace' } },
  { path: 'clanky', component: ArticlesComponent, data: { title: 'Seznam clanku' } },
  { path: 'clanek/:id', component: ArticleDetailComponent, data: { title: 'Konkretni clanek' } },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent}
];

export function initializeApp(envConfig: EnvironmentConfig) {
  return () => envConfig.load();
}

export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http as any, './assets/i18n/', `.json`);
}

@NgModule({
  declarations: [
    AppComponent,
    MakeOrderComponent,
    HomeComponent,
    FormComponent,
    ContactComponent,
    CookiesComponent,
    PersonalDataComponent,
    AuthComponent,
    ArticlesComponent,
    ArticleItemComponent,
    ArticleDetailComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ValidationModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    SharedService,
    EnvironmentConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [EnvironmentConfig],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
