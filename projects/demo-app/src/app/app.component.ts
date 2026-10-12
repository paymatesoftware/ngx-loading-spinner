import {afterNextRender, ChangeDetectionStrategy, Component, signal, TemplateRef, viewChild} from '@angular/core';
import {NgForm, FormsModule} from '@angular/forms';
import {ANIMATION_TYPES, NgxLoadingSpinnerConfig} from '../../../ngx-loading-spinner';

import {ColorPickerDirective} from 'ngx-color-picker';
import {NgxLoadingSpinnerDirective} from '../../../ngx-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FormsModule, ColorPickerDirective, NgxLoadingSpinnerDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  customTemplate = viewChild<TemplateRef<any>>('customTemplate');
  show = signal(false);
  borderRadius = 15;
  fontSize: any;
  template = signal<TemplateRef<any> | null>(null);
  initialized = signal(false);

  loadingConfig: NgxLoadingSpinnerConfig = new NgxLoadingSpinnerConfig({
    animationType: ANIMATION_TYPES.cubeGrid,
    backdropColor: 'rgba(0, 0, 0, 0.3)',
    spinnerPosition: 'center',
    backdropBorderRadius: '15px',
    spinnerSize: 'md',
    spinnerFontSize: '',
    spinnerColor: '#fff'
  });

  btnLoadingConfig: NgxLoadingSpinnerConfig = new NgxLoadingSpinnerConfig({
    animationType: ANIMATION_TYPES.fadingCircle,
    backdropColor: 'transparent',
    spinnerPosition: 'left', spinnerFontSize: '',
    spinnerSize: 'xs',
    spinnerColor: 'green'
  });

  constructor() {
    afterNextRender(() => this.initialized.set(true));
  }

  showLoading() {
    this.show.set(true);
    setTimeout(() => {
      this.show.set(false);
    }, 1500);
  }

  onChangeOptions(form: NgForm) {
    this.loadingConfig.backdropBorderRadius = form.value.backdropBorderRadius + 'px';
    this.loadingConfig.spinnerFontSize = form.value.spinnerFontSize + 'px';


    if (form.value.customTemplate) {
      this.template.set(this.customTemplate() ?? null);
    } else {
      this.template.set(null);
    }
  }
}
