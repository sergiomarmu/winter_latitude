/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component } from '@angular/core';
import { ModalController, NavController} from 'ionic-angular';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Imports del componentes [.ts] de la paǵina principal de nuestra aplicación y de contenResorts
 */
import {HomePage} from "../home/home";
import { ContentResorts } from "./contentResorts";

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-resorts',
  templateUrl: 'resorts.html'
})

/**
 * Clase Resorts, componente de Resorts con información de todas las estaciones
 */
export class Resorts{

  /**
   * Definición de la variable items, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param items
   */
  items: FirebaseListObservable<any>;

  /**
   * Definición de la variable cmpt
   * @param cmpt
   */
  cmpt: number;

  /**
   * Constructor de la clase Resorts
   */
  constructor(public navCtrl: NavController,
              db: AngularFireDatabase,
              public modalCtrl: ModalController){

    /**
     * Extraemos la información de las estaciones de la BD de FireBase y la guardamos en la variable items
     */
    this.items = db.list("/Estaciones", { preserveSnapshot: true });

    /**
     * Recorremos las estaciones y mediante un console log, visualizamos la información
     */
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.key)
        console.log(snapshot.val().image)
      });
    })

    /**
     * Obtenemos el numero de estaciones que hay en la BD de FireBase y la guardamos en la variable cmpt
     */
    this.cmpt = Object.keys(this.items).length;

    /**
     * Mostramos por consola la variable items
     */
    console.log(this.items);
  }

  /**
   * Función que envia un characterNum mediante un click, a una nueva página, que visualiza la información que tiene
   * la estacione mediante este characterNum
   * @param characterNum
   */
  openModal(characterNum) {
    let modal = this.modalCtrl.create(ContentResorts, characterNum);
    modal.present();
  }

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.navCtrl.setRoot(HomePage);
  }
}
