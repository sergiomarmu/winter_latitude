/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Imports del componente [.ts] de la página login
 */
import { LoginPage } from '../login/login';
import { Inicio } from '../admin-inicio/Inicio';
import { Estacion } from '../admin-estacion/Estacion';



/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
 * Clase HomePage, componente de HomePage el cual nos permitira mostrar la cantidad de estaciones y deportes de nuestra BD,
 * Firebase de nuestra aplicación, además de ser la página principal
 */
export class HomePage {

  /**
   * Definición de la variable loggedHome
   * @param loggedHome
   */
  loggedHome: boolean = false;

  /**
   * Definición de la variable estaciones, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param estaciones
   */
  estaciones: FirebaseListObservable<any>;

  /**
   * Definición de la variable deportes, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param deportes
   */
  deportes: FirebaseListObservable<any>;

  /**
   * Definición de la variable cmptEstaciones inicializada a 0
   * @param cmptEstaciones
   */
  cmptEstaciones: number = 0;

  /**
   * Definición de la variable cmptEstaciones inicializada a 0
   * @param cmptDeportes
   */
  cmptDeportes: number= 0;

  /**
   * Constructor de la clase HomePage
   */
  constructor(public navCtrl: NavController,
              db: AngularFireDatabase,
              public menu: MenuController){
    /**
     * Habilita el menú de navegación de la aplicación
     */
    this.menu.enable(true);

    /**
     * Comprueba si estas logueado o no, y si lo estas te lleva a la página principal
     */
    if(!this.isLoggedIn()){
      console.log('Estas logeado');
      if(!this.loggedHome) {
        this.navCtrl.push(LoginPage);
        this.loggedHome = true;
      }
    }

    /**
     * Extraemos la información de las estaciones de la BD de FireBase y la guardamos en la variable estacion
     */
    this.estaciones = db.list("/Estaciones", { preserveSnapshot: true });

    /**
     * Al recorrer las estaciones incrementamos cmptEstaciones para saber las estaciones totales
     */
    this.estaciones.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.cmptEstaciones +=1;
      });
    })

    /**
     * Extraemos la información de los deportes de la BD de FireBase y la guardamos en la variable estacion
     */
    this.deportes = db.list("/Home", { preserveSnapshot: true });

    /**
     * Al recorrer las estaciones incrementamos cmptDeportes para saber las estaciones totales
     */
    this.deportes.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.cmptDeportes +=1;
      });
    })

  }

  /**
   * Función comprueba si estás logueado, recuperando una variable de localStorage
   * @return true
   */
  isLoggedIn(){
    if(window.localStorage.getItem('currentuser')){
      return true;
    }
  }

  /**
   * Función que la cierra sessión y te vuelve a la página del login
   */
  logOut(){
    window.localStorage.removeItem('currentuser');
    this.loggedHome = false;
  }

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    switch (page){
      case 'Inicio':
        this.navCtrl.setRoot(Inicio);
        break;
      case 'Estacion':
        this.navCtrl.setRoot(Estacion);
        break;

    }
  }


}
