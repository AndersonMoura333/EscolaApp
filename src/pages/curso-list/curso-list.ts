import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CursoProvider } from '../../providers/curso/curso';

/**
 * Generated class for the CursoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curso-list',
  templateUrl: 'curso-list.html',
})
export class CursoListPage {

  cursos = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cursoProvider: CursoProvider,
    ) {

      this. cursoProvider.listar().subscribe(_cursos => {
        this.cursos = _cursos;
      })
  }

  addItem(){
    this.navCtrl.push('CursoFormPage');
  }

  editarItem(item){
    const cursoID = item.key;
    const curso = item.value;
    this.navCtrl.push('CursoFormPage', {itemID: cursoID, item: curso})
  }
}

