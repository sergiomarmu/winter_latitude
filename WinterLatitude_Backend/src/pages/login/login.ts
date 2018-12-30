/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component } from '@angular/core';
import { IonicApp,NavController, NavParams,MenuController } from 'ionic-angular';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs";
import * as firebase from 'firebase/app';

/**
 * Imports del componente [.ts] de la página principal home
 */
import { HomePage } from '../home/home';

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})

/**
 * Clase LoginPage, componente de LoginPage la cuál nos permitirá mostrar la cantidad de estaciones y deportes de nuestra BD,
 * Firebase de nuestra aplicación, además de ser la página principal
 */
export class LoginPage {

  /**
   * Definición de la variable Observable user de FireBase
   * @param user
   */
  user: Observable<firebase.User>;

  /**
   * Definición de la variable correo
   * @param correo
   */
  correo:any;

  /**
   * Definición de la variable contra
   * @param contra
   */
  contra:any;

  /**
   * Definición de la variable logged
   * @param logged
   */
  logged: boolean = false;

  /**
   * Constructor de la clase HomePage
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public db: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public app: IonicApp,
              public menu: MenuController) {

    /**
     * Añade la propiedad de autentificación a la variable Observable user
     */
    this.user = afAuth.authState;

    /**
     * Deshabilita el menú de navegación de la aplicación
     */
    this.menu.enable(false);

  }

  /**
   * Función que  autentifica mediante un correo y contraseña, el acceso a la aplicación mediante una conexión a Authentication
   * de FireBase
   */
  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.correo,this.contra).then((response) => {
      console.log('Acceso aprobado' + JSON.stringify(response));
      let currentuser = {
        email: response.correo,
        picture: response.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.logged = true;
      this.navCtrl.setRoot(HomePage);
    }).catch((error)=> {
        console.log(error);
      }
    );
  }

  /**
   * Función cierra la sesión de la aplicación y vuelve a la página de login
   */
  logout() {
    this.afAuth.auth.signOut();
    this.logged=false;
  }

  }
