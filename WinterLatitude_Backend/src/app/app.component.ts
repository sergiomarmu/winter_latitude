/**
 * Imports de  Angular y Ionic necesarios
 */
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Imports de los componentes [.ts] de las paǵinas de nuestra aplicación
 */
import { HomePage } from '../pages/home/home';
import { Inicio } from '../pages/admin-inicio/Inicio';
import { Estacion } from '../pages/admin-estacion/Estacion';
import { EstacionData } from '../pages/admin-estacion-data/EstacionData';
import { Material } from '../pages/admin-material/Material';
import { ParteNieve } from '../pages/admin-parteNieve/ParteNieve';
import { LoginPage } from '../pages/login/login';


/**
 * Componente decorador, en el que incluye una página html la cuál utilizaremos
 */
@Component({
  templateUrl: 'app.html'
})

/**
 * Clase MyApp, componente principal de navegación de la aplicación la cuál nos ayudará a navegar entre las diferentes páginas
 * a través de un menú
 */
export class MyApp {

  /**
   * Componente decorador, para poder acceder al clases superiores
   * @param nav
   */
  @ViewChild(Nav) nav: Nav;
  /**
   * Definición de la variable rootPage, en la cuál declararemos el componente root inicial de nuestra aplicación
   * @param rootPage
   */
  rootPage: any = LoginPage;
  /**
   * Definición de la array para guardar una lista de páginas, con un titulo y su correspondiente componente
   * @param pages
   */
  pages: Array<{ title: string, component: any }>;
  /**
   * Constructor de la clase MyApp
   */
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {

    /**
     * Iniciamos la aplicación
     */
    this.initializeApp();

    /**
     * Guardamos valores en la array pages, para su navegación
     */
    this.pages = [
      { title: 'Home', component: HomePage},
      { title: 'Admin-Inicio', component: Inicio },
      { title: 'Admin-Estación', component: Estacion },
      { title: 'Admin-Estación-data', component:EstacionData},
      { title: 'Admin-Material', component: Material},
      { title: 'Admin-ParteNieve', component: ParteNieve},
      { title: 'Salir', component: LoginPage }
    ];

  }
  /**
   * Función para para iniciar la aplicación, cuándo la aplicación este lista y sus componentes también,
   * mostramos la aplicación y ocultamos el splashScreen (pantalla de carga)
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  /**
   * Función que resetea el contenido del nav, a su correspondiente página y la muestra
   * @param page
   */
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
