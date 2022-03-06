import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AlunoProvider } from '../../providers/aluno/aluno';


/**
 * Generated class for the AlunoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aluno-list',
  templateUrl: 'aluno-list.html',
})
export class AlunoListPage {

  alunos = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alunoProvider: AlunoProvider,
    public modalCtrl: ModalController
    ) {


      this.carregaLista();
  }

  addItem(){
    this.navCtrl.push('AlunoFormPage');
  }

  editarItem(item){
    const alunoID = item.key;
    const aluno = item.value;
    this.navCtrl.push('AlunoFormPage', {itemID: alunoID, item: aluno})
  }

  openFilter(){
    const modal = this.modalCtrl.create('AlunoFilterPage');

    modal.onDidDismiss(_params =>{

      if(_params){

        if(_params.isLimpar){
          this.carregaLista();
        }else{

          let cidade = _params.cidade;
          let uf = _params.uf;
          this. alunoProvider.buscarFS(uf,cidade).subscribe(_alunos => {
            this.alunos = _alunos;
          })
        }

      }
      })
    modal.present();
  }

  carregaLista() {
    this.alunoProvider.listarFS().subscribe(_data => {
      console.log(_data);
      this.alunos = _data;
    })
  }
}
