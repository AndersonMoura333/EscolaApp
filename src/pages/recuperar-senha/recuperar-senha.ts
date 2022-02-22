import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { title } from 'process';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the RecuperarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {
  email='';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarSenhaPage');
  }
  recuperar(){
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    this.userProvider.recuperarSenha(this.email).then(user =>{
      loader.dismiss();
      this.showAlertEmailEnviado();
    });
  }

  showAlertEmailEnviado() {
    const alert = this.alertCtrl.create({
      title: 'Email enviado',
      subTitle: 'Mandamos um email para você, abra-o para recuperar sua senha.',
      buttons: [{
        text: 'ok',
        handler: data =>{
          this.navCtrl.pop();
        }
      }
      ]
    });
    alert.present();
  }
}
