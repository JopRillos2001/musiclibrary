import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { ArtistComponent } from './main/artist/artist.component';
import { MusicComponent } from './main/music/music.component';
import { MycollectionComponent } from './main/mycollection/mycollection.component';
import { AdminMusicComponent } from './admin/admin-music/admin-music.component';
import { AdminArtistComponent } from './admin/admin-artist/admin-artist.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { MusicFormComponent } from './admin/music-form/music-form.component';
import { ArtistFormComponent } from './admin/artist-form/artist-form.component';
import { ArtistCardComponent } from './partial/artist-card/artist-card.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { MusicService } from './service/music.service';
import { ArtistService } from './service/artist.service';
import { MusicCardComponent } from './partial/music-card/music-card.component';
import { SelectArtistComponent } from './admin/select-artist/select-artist.component';
import { ArtistdetailsComponent } from './main/artistdetails/artistdetails.component';
import { MusicdetailsComponent } from './main/musicdetails/musicdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BsNavbarComponent,
    ArtistComponent,
    MusicComponent,
    MycollectionComponent,
    AdminMusicComponent,
    AdminArtistComponent,
    LoginComponent,
    MusicFormComponent,
    ArtistFormComponent,
    ArtistCardComponent,
    AdminUserComponent,
    MusicCardComponent,
    SelectArtistComponent,
    ArtistdetailsComponent,
    MusicdetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'artists', component: ArtistComponent },
        { path: 'artists/:id/music', component: ArtistdetailsComponent },
        { path: 'artists/:id/music/:mid', component: MusicdetailsComponent },
        { path: 'music', component: MusicComponent },
        { path: 'music/:id/:mid', component: MusicdetailsComponent },
        { path: 'login', component: LoginComponent },
        {
          path: 'my/collection',
          component: MycollectionComponent,
          canActivate: [AuthGuardService],
        },
        {
          path: 'admin/music/new',
          component: SelectArtistComponent,
          canActivate: [AuthGuardService, AdminAuthGuardService],
        },
        {
          path: 'admin/music/:id',
          component: MusicFormComponent,
          canActivate: [AuthGuardService, AdminAuthGuardService],
        },
        {
          path: 'admin/music',
          component: AdminMusicComponent,
          canActivate: [AuthGuardService, AdminAuthGuardService],
        },
        {
          path: 'admin/artists/:id/music/new',
          component: MusicFormComponent,
          canActivate: [AuthGuardService, AdminAuthGuardService],
        },
        {
          path: 'admin/artists/:id/music/:mid',
          component: MusicFormComponent,
          canActivate: [AuthGuardService, AdminAuthGuardService],
        },
        {
          path: 'admin/artists/new',
          component: ArtistFormComponent,
          canActivate: [AuthGuardService, AdminAuthGuardService],
        },
        {
          path: 'admin/artists/:id',
          component: ArtistFormComponent,
          canActivate: [AuthGuardService, AdminAuthGuardService],
        },
        {
          path: 'admin/artists',
          component: AdminArtistComponent,
          canActivate: [AuthGuardService, AdminAuthGuardService],
        },
        {
          path: 'admin/users',
          component: AdminUserComponent,
          canActivate: [AuthGuardService, AdminAuthGuardService],
        },
      ],
      { scrollPositionRestoration: 'enabled' }
    ),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuardService,
    AdminAuthGuardService,
    MusicService,
    ArtistService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
