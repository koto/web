import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FavouriteTracksViewComponent} from './components/favourite-tracks-view/favorite-tracks-view';
// tslint:disable-next-line: max-line-length
import {AuthenticatedUserPlaylistsViewComponent} from './components/authenticated-user-playlists-view/authenticated-user-playlists-view.component';
import {AuthenticatedUserViewComponent} from './components/authenticated-user-view/authenticated-user-view.component';
import {AuthenticatedUserGuard} from '../shared/guards/authenticated-user-guard';
// tslint:disable-next-line: max-line-length
import {AuthenticatedUserPlaylistFormViewComponent} from './components/authenticated-user-playlist-form-view/authenticated-user-playlist-form-view';
import {AuthenticatedUserPlaylistGuard} from '../playlists/guards/authenticated-user-playlist-guard';

const routes: Routes = [
  {path: 'me', component: AuthenticatedUserViewComponent, canActivate: [AuthenticatedUserGuard]},
  {path: 'me/likes', component: FavouriteTracksViewComponent, canActivate: [AuthenticatedUserGuard]},
  {path: 'me/playlists', component: AuthenticatedUserPlaylistsViewComponent, canActivate: [AuthenticatedUserGuard]},
  {path: 'me/playlists/:provider/new', component: AuthenticatedUserPlaylistFormViewComponent, canActivate: [AuthenticatedUserGuard]},
// tslint:disable-next-line: max-line-length
  {path: 'me/playlists/:provider/:id/edit', component: AuthenticatedUserPlaylistFormViewComponent, canActivate: [AuthenticatedUserPlaylistGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthenticatedUserRoutingModule {
}
