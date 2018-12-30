/**
 * Imports de  Angular necesario
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/**
 * Imports de los componentes [.ts] del navegador de la aplicación
 */
import { AppModule } from './app.module';

/**
 * Selección del módulo boostrap
 */
platformBrowserDynamic().bootstrapModule(AppModule);
