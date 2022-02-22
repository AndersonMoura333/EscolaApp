import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesUsuariosPage } from './detalhes-usuarios';

@NgModule({
  declarations: [
    DetalhesUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesUsuariosPage),
  ],
})
export class DetalhesUsuariosPageModule {}
