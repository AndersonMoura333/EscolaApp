import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {Storage} from "@ionic/storage";

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient,
              public afd: AngularFireDatabase,
              public afa: AngularFireAuth
    ) {
    console.log('Hello UserProvider Provider');
  }

  login(email,senha){
    return this.afa.auth.signInWithEmailAndPassword(email, senha);
  }

  cadastro(usuario){
    return this.afa.auth.createUserWithEmailAndPassword(usuario.email,usuario.senha);
  }

  recuperarSenha(email){
    return this.afa.auth.sendPasswordResetEmail(email);

  }
  salvarUsuario(usuario){
    this.afd.object('/usuarios/' + usuario.id).update(usuario)
  }

  listarUsuarios(){
    return this.afd.list('/usuarios').valueChanges();
  }

  listarEnderecos(){
    return this.afd.list('/endereco').valueChanges();
  }
  salvarCep(endereco){
    this.afd.list('/endereco').push(endereco);
  }


}
