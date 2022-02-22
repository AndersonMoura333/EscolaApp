import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Professor } from '../../models/professor';
import { ProfessorProvider } from '../../providers/professor/professor';

/**
 * Generated class for the ProfessorFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-professor-form',
  templateUrl: 'professor-form.html',
})
export class ProfessorFormPage {
  professorID = undefined
  professor = new Professor();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public professorProvider: ProfessorProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController
              ) {

                const professorID = this.navParams.get('itemID');
                const professor = this.navParams.get('item');
                if(professorID){
                  this.professorID = professorID;
                  this.professor = professor;
                }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad professorFormPage');
  }

  salvar(){

    if(this.professorID){
      this.presentToast('Dados atualizados com sucesso')
      this.professorProvider.atualizar(this.professorID,this.professor);
      this.navCtrl.pop();
    }else{

      this.professorProvider.inserir(this.professor).then(professor =>{
        this.presentToast('professor adicionado com sucesso');
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
      message: 'Deseja realmente excluir esse professor?',
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
            this.professorProvider.remover(this.professorID).then(_dados =>{
              console.log('excluido');
              this.navCtrl.setRoot('ProfessorListPage')
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
