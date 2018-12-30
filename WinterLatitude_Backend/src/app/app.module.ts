/**
 * Imports de  Angular y Ionic necesarios
 */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

/*
 * Imports de los componentes [.ts] del navegador de la aplicación y las paǵinas de nuestra aplicación
 */
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Inicio } from '../pages/admin-inicio/Inicio';
import { Estacion } from '../pages/admin-estacion/Estacion';
import { EstacionData } from '../pages/admin-estacion-data/EstacionData';
import { Ski } from '../pages/admin-material/subpages/ski/Ski';
import { Raquetas } from '../pages/admin-material/subpages/raquetas/Raquetas';
import { Nordic } from '../pages/admin-material/subpages/nordic/Nordic';
import { SnowBoard } from '../pages/admin-material/subpages/snowboard/SnowBoard';
import { SnowMobile } from '../pages/admin-material/subpages/snowmobile/SnowMobile';
import { ParteNieve } from '../pages/admin-parteNieve/ParteNieve';
import { Material } from '../pages/admin-material/Material';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

/**
 * Imports con los Providers necesarios para nuestra aplicación
 */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Imports necesarios para la utilización y ejecución del Login
 */
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Componente decorador, componente muy importante ya que, todo lo que queramos incluir
 * en la aplicación es necesario importarlo y declararlo aqui para su compilación y ejecución
 */
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Inicio,
    Estacion,
    EstacionData,
    Material,
    Ski,
    Raquetas,
    Nordic,
    SnowBoard,
    SnowMobile,
    ParteNieve,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "yourAPI",
      authDomain: "yourDomain",
      databaseURL: "yourDatabaseURL",
      projectId: "yourProjectId",
      storageBucket: "yourStorageBucket",
      messagingSenderId: "35017626222"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Inicio,
    Estacion,
    EstacionData,
    Material,
    Ski,
    Raquetas,
    Nordic,
    SnowBoard,
    SnowMobile,
    ParteNieve,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AngularFireAuth,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
/**
 * Clase MyApp, componente principal de la aplicación
 */
export class AppModule { }
