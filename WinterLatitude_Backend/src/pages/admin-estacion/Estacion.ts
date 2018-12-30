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
  selector: 'page-Estacion',
  templateUrl: 'Estacion.html'
})

/**
 * Clase Estacion, componente de Estacion el cual nos permitira mostrar, añadir, actualizar y borrar estaciones
 * de la base de datos, Firebase de nuestra aplicación
 */
export class Estacion {

  /**
   * Definición de la variable estacion, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param estacion
   */
  estacion:  FirebaseListObservable<any>;
  /**
   * Constructor de la clase Estacion
   */
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public db: AngularFireDatabase) {

    /**
     * Extraemos la información de estaciones en la BD de FireBase y la guardamos en la variable estacion
     */
    this.estacion = this.db.list('/Estaciones');

  }

  /**
   * Función que crea una estación en la BD de FireBase con los parámetros introducidos mediante
   * la templateUrl
   */
  createEstacion(){
    let newUserModal = this.alertController.create({
      title: "Nueva Estación",
      message: "Agrega aquí una nueva Estación",
      cssClass: 'hola',
      inputs: [
        {
          name: "description",
          placeholder: "Descripción"
        },
        {
          name: "image",
          placeholder: "Imagen"
        },
        {
          name:"latitude",
          placeholder: "Latitud"
        },
        {
          name: "logo",
          placeholder: "Logo"
        },
        {
          name:"longitude",
          placeholder: "Longitud"
        },
        {
          name:"name",
          placeholder: "Nombre"
        },
        {
          name:"ubication",
          placeholder: "Ubicación"
        },
        {
          name:"webcam",
          placeholder: "Webcam"
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
            firebase.database().ref('Estaciones/' + data.name).set({
              description: data.description,
              image: data.image,
              latitude: data.latitude,
              logo: data.logo,
              longitude: data.longitude,
              name: data.name,
              ubication: data.ubication,
              webcam: data.webcam
            });
          }
        }
      ]
    });
    newUserModal.present(newUserModal);
  }

  /**
   * Función que actualiza una estación en la BD de FireBase con los parámetros introducidos mediante
   * la templateUrl
   * @param u
   */
  updateEstacion(u){
    let updateUserModal = this.alertController.create({
      title: "Actualizar Estación",
      message: u.name,
      inputs: [
         {
          name: "description",
          placeholder: "Descripción",
          value: u.description
        },
        {
          name: "image",
          placeholder: "Imagen",
          value: u.image
        },
        {
          name:"latitude",
          placeholder: "Latitud",
          value: u.latitude
        },
        {
          name: "logo",
          placeholder: "Logo",
          value: u.logo
        },
        {
          name:"longitude",
          placeholder: "Longitud",
          value: u.longitude
        },
        {
          name:"name",
          placeholder: "Nombre",
          value: u.name
        },
        {
          name:"ubication",
          placeholder: "Ubicación",
          value: u.ubication
        },
        {
          name:"webcam",
          placeholder: "Webcam",
          value: u.webcam
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
            this.estacion.update( u.$key, {
              description: data.description,
              image: data.image,
              latitude: data.latitude,
              logo: data.logo,
              longitude: data.longitude,
              name: data.name,
              ubication: data.ubication,
              webcam: data.webcam
            });
          }
        }
      ]
    });
    updateUserModal.present(updateUserModal);
  }

  /**
   * Función que elimina una estación en la  BD de FireBase
   * @param estacion
   */
  removeEstacion(estacion){
    this.estacion.remove(estacion);
  }

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.navCtrl.setRoot(HomePage);
  }

}
