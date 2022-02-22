import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  usuarios = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    ) {

      this.userProvider.listarUsuarios().subscribe(_usuarios => {
        this.usuarios = _usuarios;
      })
  }


}
