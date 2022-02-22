import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list-usuarios/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public storage: Storage

              ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Usuarios', component: ListPage },
      { title: 'Endereços', component: 'ListEnderecoPage' },
      { title: 'Alunos', component: 'AlunoListPage' },
      { title: 'Professores', component: 'ProfessorListPage' },
      { title: 'Cursos', component: 'CursoListPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get('usuario').then(_usuario =>{
        if(_usuario && _usuario.length > 0){
          this.rootPage = HomePage;
        }else{
          this.rootPage = 'LoginPage'
        }
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.storage.remove('usuario').then(_data =>{
      this.nav.setRoot('LoginPage');
    })
  }
}
