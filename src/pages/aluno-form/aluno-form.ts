import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Aluno } from '../../models/aluno';
import { AlunoProvider } from '../../providers/aluno/aluno';

/**
 * Generated class for the AlunoFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aluno-form',
  templateUrl: 'aluno-form.html',
})
export class AlunoFormPage {
  alunoID = undefined
  aluno = new Aluno();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alunoProvider: AlunoProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController
              ) {

                const alunoID = this.navParams.get('itemID');
                const aluno = this.navParams.get('item');
                if(alunoID){
                  this.alunoID = alunoID;
                  this.aluno = aluno;
                }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlunoFormPage');
  }

  salvar(){

    if(this.alunoID){
      this.presentToast('Dados atualizados com sucesso')
      this.alunoProvider.atualizar(this.alunoID,this.aluno);
      this.navCtrl.pop();
    }else{

      this.alunoProvider.inserir(this.aluno).then(aluno =>{
        this.presentToast('Aluno adicionado com sucesso');
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
      message: 'Deseja realmente excluir esse aluno?',
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
            this.alunoProvider.remover(this.alunoID).then(_dados =>{
              console.log('excluido');
              this.navCtrl.setRoot('AlunoListPage')
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
