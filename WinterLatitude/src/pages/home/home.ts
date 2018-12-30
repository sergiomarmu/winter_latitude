/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Imports de los componentes [.ts] de los diferentes materiales para alquilar
 */
import {Raquetas} from "./subpages/raquetas/raquetas";
import {Snowboard} from "./subpages/snowboard/snowboard";
import {Ski} from "./subpages/ski/ski"
import {Nordico} from "./subpages/nordic/nordic";
import {Snowmobile} from "./subpages/snowmobile/snowmobile";

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
 * Clase HomePage, componente de HomePage, página principal, la cuál nos hará de enrutador entre las diferentes
 * páginas de deportes
 */
export class HomePage {

  /**
   * Constructor de la clase HomePage
   */
  constructor(public navCtrl: NavController) {
  }

  /**
   * Función que hace de router entre las diferentes páginas de deportes, pasandole una variable numerica
   * @param n
   */
  page(n: number) {
    if(n == 1){
      this.navCtrl.push(Nordico);
    } else if(n == 2){
      this.navCtrl.push(Raquetas);
    } else if(n == 3){
      this.navCtrl.push(Ski);
    } else if(n == 4){
      this.navCtrl.push(Snowboard);
    } else if(n == 5){
      this.navCtrl.push(Snowmobile);
    }
  }
}
