import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class CursoProvider {

  constructor(public http: HttpClient,
              public afd: AngularFireDatabase,
    ) {
    console.log('Hello cursosProvider Provider');
  }

  listar(){
    return this.afd.list('/cursos').snapshotChanges().map(
      item => item.map(changes => ({key: changes.key, value: changes.payload.val()}))
    );
  }


  inserir(curso){
    return this.afd.list('/cursos').push(curso);

  }

  atualizar(id, curso){
    return this.afd.object('/cursos/' + id).update(curso);

  }

  remover(id){

    return this.afd.object('/cursos/' + id).remove();

  }
}

