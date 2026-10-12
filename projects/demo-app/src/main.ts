import {provideNgxLoadingSpinner} from '../../ngx-loading-spinner';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';


bootstrapApplication(AppComponent, {
  providers: [
    provideNgxLoadingSpinner({spinnerSize: ''})
  ]
})
  .catch(err => console.error(err));
