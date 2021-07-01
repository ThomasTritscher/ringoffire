import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HelpComponent } from './help/help.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
{ path: '', component: StartScreenComponent},
{ path: 'game/:id', component: GameComponent},
{ path: 'help', component: HelpComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
