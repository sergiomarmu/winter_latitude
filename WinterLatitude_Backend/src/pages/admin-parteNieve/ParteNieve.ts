/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

/**
 * Imports del componente [.ts] de la paǵina principal de nuestra aplicación
 */
import {HomePage} from "../home/home";

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-ParteNieve',
  templateUrl: 'ParteNieve.html'
})

/**
 * Clase ParteNieve, componente de ParteNieve el cual nos permitira mostrar, añadir, actualizar y borrar
 * toda la información del Parte de Nieve de las estaciones, de la base de datos, Firebase de nuestra aplicación
 */
export class ParteNieve {

  /**
   * Definición de la variable parteDenieve, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param parteDenieve
   */
  parteDenieve:  FirebaseListObservable<any>;

  /**
   * Constructor de la clase ParteNieve
   */
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public db: AngularFireDatabase) {

    /**
     * Extraemos la información de los Partes de Nieve de la BD de FireBase y la guardamos en la variable estacion
     */
    this.parteDenieve = this.db.list('/Tiempo');

  }

  /**
   * Función que actualiza un parte de nieve en la BD de FireBase con los parámetros introducidos mediante
   * la templateUrl
   * @param u
   */
  updateParteDeNieve(u){
    let updateUserModal = this.alertController.create({
      title: "Actualizar PartedeNieve",
      message: u.name,
      inputs: [
         {
          name: "Espesores",
          placeholder: "Espesores",
          value: u.PartedeNieve.Espesores
        },
        {
          name: "Estado",
          placeholder: "Estado",
          value: u.PartedeNieve.Estado
        },
        {
          name:"Pistas",
          placeholder: "Pistas",
          value: u.PartedeNieve.Pistas
        },
        {
          name: "Prevision",
          placeholder: "Prevision",
          value: u.PartedeNieve.Prevision
        },
        {
          name:"Remontadores",
          placeholder: "Remontadores",
          value: u.PartedeNieve.Remontadores
        }
      ],
      buttons:[
        {
          text: "Cancelar",
          handler: data => {
            console.log('Cancel Clic');
          }
        },
        {
          text: "Guardar",
          handler: data => {
            firebase.database().ref('Tiempo/' + u.$key+'/PartedeNieve/').update( {
              Espesores: data.Espesores,
              Estado: data.Estado,
              Pistas: data.Pistas,
              Prevision: data.Prevision,
              Remontadores: data.Remontadores
            });
          }
        }
      ]
    });
    updateUserModal.present(updateUserModal);
  }

  /**
   * Función que elimina un parte de nieve en la BD de FireBase
   * @param parteDenieve
   */
  removeParteDeNieve(parteDenieve){
    this.parteDenieve.remove(parteDenieve);
  }

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.navCtrl.setRoot(HomePage);
  }

}
