/**
 * Imports de  Angular y Ionic necesarios
 */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

/**
 * Imports de los componentes [.ts] del navegador de la aplicación y las paǵinas de nuestra aplicación
 */
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Weather } from '../pages/weather/weather';
import { Map } from '../pages/map/map';
import { Resorts } from '../pages/resorts/resorts';
import { ContentResorts } from '../pages/resorts/contentResorts';
import { MaterialDetailsPage } from '../pages/material/material';
import { Material } from '../pages/material/material';
import { ContentPageWeather } from '../pages/weather/contentWeather';

/**
 * Imports necesarios para la utilización y ejecución de Firebase
 */
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Ski } from '../pages/home/subpages/ski/ski';
import { Nordico } from '../pages/home/subpages/nordic/nordic';
import { Raquetas } from '../pages/home/subpages/raquetas/raquetas';
import { Snowboard } from '../pages/home/subpages/snowboard/snowboard';
import { Snowmobile } from '../pages/home/subpages/snowmobile/snowmobile';

import { About } from '../pages/about/about';

/**
 * Imports con los Providers necesarios para nuestra aplicación
 */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Componente decorador, componente muy importante ya que, todo lo que queramos incluir
 * en la aplicación es necesario importarlo y declararlo aqui para su compilación y ejecución
 */
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Weather,
    ContentResorts,
    Resorts,
    Map,
    Material,
    MaterialDetailsPage,
    ContentPageWeather,
    Ski,
    Nordico,
    Raquetas,
    Snowboard,
    Snowmobile,
    About
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
    Weather,
    ContentResorts,
    Resorts,
    Map,
    Material,
    MaterialDetailsPage,
    ContentPageWeather,
    Ski,
    Nordico,
    Raquetas,
    Snowboard,
    Snowmobile,
    About
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})

/**
 * Clase MyApp, componente principal de la aplicación
 */
export class AppModule { }
