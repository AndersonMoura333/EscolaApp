import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Curso } from '../../models/curso';
import { CursoProvider } from '../../providers/curso/curso';

/**
 * Generated class for the CursoFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curso-form',
  templateUrl: 'curso-form.html',
})
export class CursoFormPage {
  cursoID = undefined
  curso = new Curso();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cursoProvider: CursoProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController
              ) {

                const cursoID = this.navParams.get('itemID');
                const curso = this.navParams.get('item');
                if(cursoID){
                  this.cursoID = cursoID;
                  this.curso = curso;
                }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad cursoFormPage');
  }

  salvar(){

    if(this.cursoID){
      this.presentToast('Dados atualizados com sucesso')
      this.cursoProvider.atualizar(this.cursoID,this.curso);
      this.navCtrl.pop();
    }else{

      this.cursoProvider.inserir(this.curso).then(curso =>{
        this.presentToast('curso adicionado com sucesso');
        this.navCtrl.pop();
      })
    }
  }

  excluir(){
    this.showConfirm();
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Excluir?',
      message: 'Deseja realmente excluir esse curso?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.cursoProvider.remover(this.cursoID).then(_dados =>{
              console.log('excluido');
              this.navCtrl.setRoot('CursoListPage')
            })
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
