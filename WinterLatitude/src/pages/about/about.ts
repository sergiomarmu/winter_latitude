/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component } from '@angular/core';
import {NavController} from "ionic-angular";

/**
 * Import del componente [.ts] de la paǵina principal de nuestra aplicación
 */
import {HomePage} from "../home/home";

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  templateUrl: 'about.html'
})

/**
 * Clase About, componente de About con información acerca de la aplicació y desarrolladores con un efecto slide
 */
export class About {

  /**
   * Constructor de la clase About
   */
  constructor(public navCtrl: NavController) {
  }

  /**
   * Definición de la array slides, en la cuál guardaremos la información correspondiente a mostrar
   */
  slides = [
    {
      title: "Aplicacion",
      description: "Nuestra aplicacion trata sobre los deportes de invierno y de las estaciones disponibles para llevarlos a cabo. <br />Con nuestra aplicacion vas a poder consultar las estaciones disponibles asi como su tiempo actual y el precio de los alquileres de material, también podras acceder a un mapa con dichas estaciones marcadas o saber la ruta desde tu posicion a la estacion que hayas elegido.<br/>",
      image: "images/images-home/cerler.jpg",
      extra: " "
    },
    {
      title: "Proyecto",
      description: "Este es el Proyecto final del ciclo de Desarrollo de Aplicaciones Web (DAW), ha sido desarrollado por Sergio Martinez Mulero  y Alejandro Rodriguez Garcia.",
      image: "images/images-home/aramon-cerler.jpg",
      extra: "easter fa fa-pied-piper-pp"
    }
  ];

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.navCtrl.setRoot(HomePage);
  }
}
