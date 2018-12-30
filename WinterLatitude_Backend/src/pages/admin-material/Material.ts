/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Imports de los componentes [.ts] de las paǵinas de nuestra aplicación
 */
import {HomePage} from "../home/home";
import {Raquetas} from "./subpages/raquetas/Raquetas";
import {SnowBoard} from "./subpages/snowboard/SnowBoard";
import {Ski} from "./subpages/ski/Ski"
import {Nordic} from "./subpages/nordic/Nordic";
import {SnowMobile} from "./subpages/snowmobile/SnowMobile";

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-material',
  templateUrl: 'Material.html'
})

/**
 * Clase Material, componente de Material, el cual nos hará de enrutador entre las diferentes páginas de materiales
 */
export class Material {
  /**
   * Constructor de la clase Material
   */
  constructor(public navCtrl: NavController) {}

  /**
   * Función que hace de router entre las diferentes páginas de materiales, pasandole una variable numerica
   * @param n
   */
  page(n: number) {
    if(n == 1){
      this.navCtrl.push(Nordic);
    } else if(n == 2){
      this.navCtrl.push(Raquetas);
    } else if(n == 3){
      this.navCtrl.push(Ski);
    } else if(n == 4){
      this.navCtrl.push(SnowBoard);
    } else if(n == 5){
      this.navCtrl.push(SnowMobile);
    }
  }

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.navCtrl.setRoot(HomePage);
  }
}
