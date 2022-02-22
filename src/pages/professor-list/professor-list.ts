import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Professor } from '../../models/professor';
import { ProfessorProvider } from '../../providers/professor/professor';

/**
 * Generated class for the ProfessorListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-professor-list',
  templateUrl: 'professor-list.html',
})
export class ProfessorListPage
{

  professores = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public professorProvider: ProfessorProvider,
    ) {

      this. professorProvider.listar().subscribe(_professors => {
        this.professores = _professors;
      })
  }

  addItem(){
    this.navCtrl.push('ProfessorFormPage');
  }

  editarItem(item){
    const professorID = item.key;
    const professor = item.value;
    this.navCtrl.push('ProfessorFormPage', {itemID: professorID, item: professor})
  }
}
