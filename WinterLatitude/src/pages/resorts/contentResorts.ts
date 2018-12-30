/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavParams, ViewController,NavController } from 'ionic-angular';

/**
 * Import del componente de ionic de geolocalización
 */
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

/**
 * Definición de variable google, la cuál necesitaremos y utilizaremos a la hora de la geolocalización
 * @param google
 */
declare var google;

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
    selector: 'page-ContentResorts',
    templateUrl: 'contentResorts.html',
})

/**
 * Clase ContentResorts, componente de ContentResorts con información de detallada de la estación seleccionada anteriormente
 */
export class ContentResorts {
    /**
     * Componente decorador, para poder acceder al clases superiores
     * @param mapElement
     */
    @ViewChild('map') mapElement: ElementRef;

    /**
     * Definición de la variable map
     * @param map
     */
    map: any;

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
     * Constructor de la clase ContentResorts
     */
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public geolocation: Geolocation,
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
      this.items = db.list("/Estaciones", { preserveSnapshot: true });

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
   * Función que espera a que todo haya cargado correctamente para iniciar una o varias funciones
   */
  ionViewDidLoad() {
    this.calcularDistancia();
  }

  /**
   * Función que calcula y imprime la distancia de tu ubicación actual a la ubicación de la estaciones.
   * Muestra el mejor recorrido en coche hacia la estacion desde tu ubicación actual
   */
  calcularDistancia() {

    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: latLng
      });
      directionsDisplay.setMap(map);

      directionsService.route({
        origin:  latLng,
        destination: {lat: Number(this.character.latitude), lng: Number(this.character.longitude)},
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }, (err) => {
      console.log(err);
    });


  }

    /**
     * Función que vuelve a la página anterior
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
