import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { addListener } from 'process';

/*
  Generated class for the AlunosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlunoProvider {

  constructor(public http: HttpClient,
              public afd: AngularFireDatabase,
    ) {
    console.log('Hello AlunosProvider Provider');
  }

  listar(){
    return this.afd.list('/alunos').snapshotChanges().map(
      item => item.map(changes => ({key: changes.key, value: changes.payload.val()}))
    );
  }

  buscar(cidade: string){
    return this.afd.list('/alunos', ref=> ref.orderByChild('cidade').equalTo(cidade)).snapshotChanges().map(
      item => item.map(changes => ({key: changes.key, value: changes.payload.val()}))
    );
  }

  inserir(aluno){
    return this.afd.list('/alunos').push(aluno);

  }

  atualizar(id, aluno){
    return this.afd.object('/alunos/' + id).update(aluno);

  }

  remover(id){

    return this.afd.object('/alunos/' + id).remove();

  }
}

