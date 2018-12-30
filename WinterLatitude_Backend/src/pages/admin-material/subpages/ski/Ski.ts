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
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-Material-Ski',
  templateUrl: 'Ski.html'
})

/**
 * Clase Ski, componente de Ski el cual nos permitira mostrar, añadir, actualizar y borrar
 * toda la información de los precios y stocks de Esquí, de la base de datos, Firebase de nuestra aplicación
 */
export class Ski {

  /**
   * Definición de la variable material, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param material
   */
  material:  FirebaseListObservable<any>;

  /**
   * Constructor de la clase Ski
   */
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public db: AngularFireDatabase) {

    /**
     * Extraemos la información de los materiales de Esquí de la BD de FireBase y la guardamos en la variable estacion
     */
    this.material = this.db.list('Material/Esqui/Estacion/');

  }

  /**
   * Función que crea un Precio y Stock de una estación en la BD de FireBase con los parámetros introducidos mediante
   * la templateUrl
   */
  createMaterial(){
    let newUserModal = this.alertController.create({
      title: "Nuevo Material",
      message: "Agrega aquí un nuevo material",
      inputs: [
        {
          name: "name",
          placeholder: "Nombre"
        },
        {
          name: "Precio",
          placeholder: "Precio"
        },
        {
          name:"Stock",
          placeholder: "Stock"
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
            firebase.database().ref('Material/Esqui/Estacion/' + data.name).set({
              Precio: data.Precio,
              Stock: data.Stock,
              name: data.name
            });
          }
        }
      ]
    });
    newUserModal.present(newUserModal);
  }

  /**
   * Función que actualiza el Precio y el Stock de una estación en la BD de FireBase con los parámetros introducidos mediante
   * la templateUrl
   * @param u
   */
  updateMaterial(u){
    let updateUserModal = this.alertController.create({
      title: "Actualizar Material",
      message: u.name,
      inputs: [
        {
          name: "Precio",
          placeholder: "Precio",
          value: u.Precio
        },
        {
          name:"Stock",
          placeholder: "Stock",
          value: u.Stock
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
            this.material.update( u.$key, {
              Precio: data.Precio,
              Stock: data.Stock
            });
          }
        }
      ]
    });
    updateUserModal.present(updateUserModal);
  }

  /**
   * Función que elimina un Precio y un Stock de una estación en la BD de FireBase
   * @param material
   */
  removeMaterial(material){
    this.material.remove(material);
  }


}
