import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  nome='';
  email='';
  senha='';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }
  cadastrar(){

    let usuario ={
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      id: ' '
    }
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    this.userProvider.cadastro(usuario).then(_usuarioAuth =>{
    loader.dismiss();
     usuario.id = _usuarioAuth.uid;
     delete usuario.senha
     this.userProvider.salvarUsuario(usuario);
     this.showAlert();
    });

  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: 'Usuario cadastrado com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: data => {
          this.navCtrl.pop();
        }}]
    });
    alert.present();
  }
}
