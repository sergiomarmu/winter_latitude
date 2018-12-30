/**
 * Imports de  Angular y Ionic necesarios
 */
import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

/**
 * Import del componente [.ts] de la paǵina principal de nuestra aplicación
 */
import {HomePage} from "../home/home";

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-material',
  templateUrl: 'material-details.html',
})

/**
 * Clase MaterialDetailsPage, componente de MaterialDetailsPage con información de todos del precio y stock en cada estación de todos los materiales
 * para realizar las actividades
 */
export class MaterialDetailsPage {

  /**
   * Definición de la variable item
   * @param item
   */
  item;

  /**
   * Definición de la array item2
   * @param item2
   */
  item2 = [];

  /**
   * Constructor de la clase MaterialDetalle
   */
  constructor(params: NavParams) {

    /**
     * Recuperamos el item, enviado desde la página anterior
     */
    this.item = params.data.item;

    /**
     * Iteramos la array item, y recuperamos la estación
     */
    for(let n in this.item.Estacion){
      this.item2.push(this.item.Estacion[n]);
    }
  }
}

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html incrustada en el ts, la cuál utilizaremos para seleccionar el material
 */
@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
         <ion-title id="header-title">Material<a (click)="openPage('Home')"><i class="fa fa-home home-button"></i></a></ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item *ngFor="let item of items | async;">
          <a class="material-box" (click)="openNavDetailsPage(item.val())">
            <img class="item-left material-logo" src="{{item.val().logo}}">
            <h1 class="material-name">{{ item.key }}</h1>
          </a>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})

/**
 * Clase Material, componente de Material con información de los deportes los cuales ofrecemos un alquiler de material
 */
export class Material {

  /**
   * Definición de la variable items, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param item
   */
  items: FirebaseListObservable<any>;

  /**
   * Constructor de la clase Material
   */
  constructor(public nav: NavController,
              db: AngularFireDatabase,
              public modalCtrl: ModalController) {

    /**
     * Extraemos la información de los deportes los cuales ofrecemos un alquiler de materialde la BD de FireBase y la guardamos en la variable items
     */
    this.items = db.list("/Material", { preserveSnapshot: true });

    /**
     * Recorremos los materiales y mediante un console log, visualizamos la información
     */
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.key);
        console.log(snapshot.val().Estacion);
      });
    })
  }

  /**
   * Función que envia un item mediante un click, a una nueva página, que visualiza la información que tiene este item
   * @param item
   */
  openNavDetailsPage(item) {
    console.log(item);
    this.nav.push(MaterialDetailsPage, { item: item });
  }

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.nav.setRoot(HomePage);
  }

}
