import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ProfessorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfessorProvider {

  constructor(public http: HttpClient,
              public afd: AngularFireDatabase,
    ) {
    console.log('Hello professoresProvider Provider');
  }

  listar(){
    return this.afd.list('/professores').snapshotChanges().map(
      item => item.map(changes => ({key: changes.key, value: changes.payload.val()}))
    );
  }

  inserir(professor){
    return this.afd.list('/professores').push(professor);

  }

  atualizar(id, professor){
    return this.afd.object('/professores/' + id).update(professor);

  }

  remover(id){

    return this.afd.object('/professores/' + id).remove();

  }
}

