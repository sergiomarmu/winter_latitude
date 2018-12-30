/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component } from '@angular/core';
import { Platform, NavParams, ViewController,NavController } from 'ionic-angular';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
    selector: 'page-contentWeather',
    templateUrl: 'contentWeather.html',
})

/**
 * Clase ContentPageWeather, componente de ContentPageWeather con información de detallada del tiempo y parte de nieve
 * de la estación seleccionada anteriormente
 */
export class ContentPageWeather {
    /**
     * Definición de la variable character
     * @param character
     */
    character;

    /**
     * Definición de la variable items, en la cuál declararemos una ListObservable
     * para guardar la información que recuperamos de la BD de FireBase
     * @param items
     */
    items: FirebaseListObservable<any>;

    /**
     * Constructor de la clase ContentPageWeather
     */
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        db: AngularFireDatabase

    ) {

      /**
       * Definición de la array list
       * @param list
       */
      let list = [];

      /**
       * Extraemos la información de las estaciones de la BD de FireBase y la guardamos en la variable items
       */
      this.items = db.list("/Tiempo", { preserveSnapshot: true });

      /**
       * Recorremos las estaciones y vamos guardando en la array list el valor de las estaciones
       */
      this.items.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log(snapshot.val())
          list.push(snapshot.val());
        });
      })

        /**
         * Igualamos la variable character a la posicion del charNum de la array list
         */
        this.character = list[this.params.get('charNum')];

    }

    /**
     * Función que vuelve a la página anterior
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
