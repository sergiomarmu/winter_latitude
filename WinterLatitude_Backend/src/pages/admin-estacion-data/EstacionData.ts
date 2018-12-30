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
  selector: 'page-EstacionData',
  templateUrl: 'EstacionData.html'
})

/**
 * Clase EstacionData, componente de EstacionData el cual nos permitira mostrar, añadir, actualizar y borrar
 * toda la información del apartado data de estación, de la base de datos, Firebase de nuestra aplicación
 */
export class EstacionData {

  /**
   * Definición de la variable estacion, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param estacion
   */
  estacion:  FirebaseListObservable<any>;
  /**
   * Constructor de la clase EstacionData
   */
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public db: AngularFireDatabase) {

    /**
     * Extraemos la información de estaciones de la BD de FireBase y la guardamos en la variable estacion
     */
    this.estacion = this.db.list('/Estaciones/');

  }

  /**
   * Función que actualiza el apartado data de nuestra estacion en la BD de FireBase con los parámetros introducidos mediante
   * la templateUrl
   * @param u
  */
  updateEstacion(u){
    let updateUserModal = this.alertController.create({
      title: "Actualizar Estación",
      message: u.name,
      inputs: [
         {
          name: "Forfet",
          placeholder: "Forfet",
          value: u.data.Forfet
        },
        {
          name: "LongitudEsquiable",
          placeholder: "Longitud Esquiable",
          value: u.data.LongitudEsquiable
        },
        {
          name:"NPistas",
          placeholder: "Num.Pistas",
          value: u.data.NPistas
        },
        {
          name: "PuntoMasAlto",
          placeholder: "Punto más Alto",
          value: u.data.PuntoMasAlto
        },
        {
          name:"Remontadores",
          placeholder: "Remontadores",
          value: u.data.Remontadores
        },
        {
          name:"Telefono",
          placeholder: "Telefóno",
          value: u.data.Telefono
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
            firebase.database().ref('Estaciones/' + u.$key+'/data/').update( {
              Forfet: data.Forfet,
              LongitudEsquiable: data.LongitudEsquiable,
              NPistas: data.NPistas,
              PuntoMasAlto: data.PuntoMasAlto,
              Remontadores: data.Remontadores,
              Telefono: data.Telefono
            });
          }
        }
      ]
    });
    updateUserModal.present(updateUserModal);
  }

  /**
   * Función que elimina el apartado data de una estación en la BD de FireBase
   * @param estacion
   */
  removeEstacion(estacion){
    this.estacion.remove(estacion.data);
  }

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.navCtrl.setRoot(HomePage);
  }

}
