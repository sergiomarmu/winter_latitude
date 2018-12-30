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
  selector: 'page-Inicio',
  templateUrl: 'Inicio.html'
})

/**
 * Clase Inicio, componente de Inicio el cual nos permitira mostrar, añadir, actualizar y borrar
 * toda la información del inicio (Home), de la base de datos, Firebase de nuestra aplicación
 */
export class Inicio {

  /**
   * Definición de la variable deporte, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param deporte
   */
  deporte:  FirebaseListObservable<any>;

  /**
   * Constructor de la clase Inicio
   */
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public db: AngularFireDatabase) {

    /**
     * Extraemos la información de los deportes de la BD de FireBase y la guardamos en la variable estacion
     */
    this.deporte = this.db.list('/Home');

  }

  /**
   * Función que crea un deporte en la BD de FireBase con los parámetros introducidos mediante
   * la templateUrl
   */
  createDeporte(){
    let newUserModal = this.alertController.create({
      title: "Nuevo Deporte",
      message: "Agrega aquí un nuevo material",
      inputs: [
        {
          name: "name",
          placeholder: "Nombre"
        },
        {
          name: "Descripcion",
          placeholder: "Descripcion"
        },
        {
          name:"Origenes",
          placeholder: "Origenes"
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
            firebase.database().ref('Home/' + data.name).set({
              Descripcion: data.Descripcion,
              Origenes: data.Origenes,
              name: data.name
            });
          }
        }
      ]
    });
    newUserModal.present(newUserModal);
  }

  /**
   * Función que actualiza un deporte en la BD de FireBase con los parámetros introducidos mediante
   * la templateUrl
   * @param u
   */
  updateDeporte(u){
    let updateUserModal = this.alertController.create({
      title: "Actualizar Deporte",
      message: u.name,
      inputs: [
        {
          name: "Descripcion",
          placeholder: "Descripcion",
          value: u.Descripcion
        },
        {
          name:"Origenes",
          placeholder: "Origenes",
          value: u.Origenes
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
            this.deporte.update( u.$key, {
              Descripcion: data.Descripcion,
              Origenes: data.Origenes
            });
          }
        }
      ]
    });
    updateUserModal.present(updateUserModal);
  }

  /**
   * Función que elimina un deporte en la BD de FireBase
   * @param deporte
   */
  removeDeporte(deporte){
    this.deporte.remove(deporte);
  }

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.navCtrl.setRoot(HomePage);
  }


}
