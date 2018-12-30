/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Import del componente de ionic de geolocalización
 */
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Import del componente [.ts] de la paǵina principal de nuestra aplicación
 */
import {HomePage} from "../home/home";

/**
 * Definición de variable google, la cuál necesitaremos y utilizaremos a la hora de la geolocalización
 * @param google
 */
declare var google;

/**
 * Componente decorador, en el que incluye un selector para este componente y una página html la cuál utilizaremos
 */
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

/**
 * Clase Map, componente de Map con información mediante un mapa de tu ubicación actual y las diferentes ubicaciones de las estaciones
 */
export class Map {

  /**
   * Definición de la variable items, en la cuál declararemos una ListObservable
   * para guardar la información que recuperamos de la BD de FireBase
   * @param items
   */
  items: FirebaseListObservable<any>;
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
   * Definición de la variable cmpt
   * @param cmpt
   */
  cmpt: number;

  /**
   * Definición de la array de numeros lat
   * @param lat
   */
  lat: number[] = [];

  /**
   * Definición de la array de numeros long
   * @param long
   */
  long: number[] = [];

  /**
   * Definición de la array de strings names
   * @param names
   */
  names: string[] = [];

  /**
   * Definición de la array de strings webs
   * @param webs
   */
  webs: string[] = [];

  /**
   * Definición de la array de latlong
   * @param latlong
   */
  latlong = [];

  /**
   * Constructor de la clase Map
   */
  constructor(public navCtrl: NavController,
              public geolocation: Geolocation,
              db: AngularFireDatabase) {

    /**
     * Definición de la variable let iniciada a 0
     * @param i
     */
    let i: number = 0;

    /**
     * Extraemos la información de las estaciones de la BD de FireBase y la guardamos en la variable items
     */
    this.items = db.list("/Estaciones", { preserveSnapshot: true });

    /**
     * Recorremos las estaciones y vamos guardando en las arrays la latitud, longitud y nombres de las items
     */
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.lat.push(snapshot.val().latitude);
        this.long.push(Number(snapshot.val().longitude));
        this.names.push(snapshot.val().name);
        this.webs.push(snapshot.val().web);
        i = i +1;
        if(i == 20){
          this.loadMap(this.lat,this.long,this.cmpt,this.names,this.webs);
        }
      });
    });

    /**
     * Guardamos la latitud a la array latLong
     */
    this.latlong.push(this.lat);

    /**
     * Igualamos la variable cmpt a i
     */
    this.cmpt = i;
  }

  /**
   * Función que crea un mapa de google maps, junto con tu ubicación actual y la ubicación de todas las estaciones almacenadas
   * en la BD de FireBase
   * @param lat
   * @param long
   * @param cmpt
   * @param names
   * @param webs
   */
  loadMap(lat,long,cmpt,names,webs) {
    this.geolocation.getCurrentPosition().then((position) => {
      console.log(lat);
      console.log(long);
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: 'Tú',
        position: this.map.getCenter()
      });

      for (let i = 0; i < 20; i++) {
        console.log(long);
        console.log(lat);
        console.log(long[3]);
        marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          title: names[i],
          icon :'images/maps/blue-map-icon.png',
          url: 'www.google.es',
          position: new google.maps.LatLng(lat[i],long[i])
        });

        google.maps.event.addListener(marker, 'click', function () {
          window.location.href = webs[i];
        });
      }

    }, (err) => {
      console.log(err);
    });

  }

  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.navCtrl.setRoot(HomePage);
  }

}

