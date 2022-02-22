import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email ='';
  senha ='';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private storage: Storage

              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  entrar(){
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    this.userProvider.login(this.email,this.senha).then(user =>{
      loader.dismiss();
      this.storage.set('usuario', user.uid).then(data =>{
        this.navCtrl.setRoot(HomePage);
      });
    }).catch(
      error=>{
        loader.dismiss();
        this.showAlertErro();
this.navCtrl.setRoot('LoginPage')
      }
    );
;

  }

  cadastro(){
    this.navCtrl.push('CadastroPage');
  }

  esqueciSenha(){
    this.navCtrl.push('RecuperarSenhaPage')
  }

  showAlertErro() {
    const alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Email ou senha invalidos',
      buttons: ['Ok']
    });
    alert.present();
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
}
