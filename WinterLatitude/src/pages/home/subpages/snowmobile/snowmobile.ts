/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-snowmobile',
  templateUrl: 'snowmobile.html',
})

/**
 * Clase Snowmobile, componente de Nordico, la cuál nos muestra información acerca del Snowmobile
 */
export class Snowmobile {

  /**
   * Definición de la variable info
   * @param info
   */
  info;
  /**
   * Definición de la variable items, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param items
   */
  items: FirebaseListObservable<any>;

  /**
   * Constructor de la clase Snowmobile
   */
  constructor(public nav: NavController,
              db: AngularFireDatabase) {

    /**
     * Definición de la array info
     * @param info
     */
    let info = [];

    /**
     * Extraemos la información del deporte de Snowmobile de la BD de FireBase y la guardamos en la variable items
     */
    this.items = db.list("/Home/SnowMobile", { preserveSnapshot: true });

    /**
     * Recorremos Snowmobile y mediante un push, guardamos el valor en la array info
     */
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        info.push(snapshot.val())
      });
    });

    /**
     * Igualamos la variable info a la array info
     */
    this.info = info;
  }

}
