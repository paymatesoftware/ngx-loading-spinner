import {ComponentRef, DestroyRef, Directive, effect, ElementRef, inject, input, model, Renderer2, signal, TemplateRef, untracked, ViewContainerRef} from '@angular/core';
import {NgxLoadingSpinnerComponent} from './ngx-loading-spinner.component';
import {NgxLoadingSpinnerConfigService} from './ngx-loading-spinner-config.service';
import {NgxLoadingSpinnerConfig} from './config';

@Directive({
  selector: '[ngx-loading]',
  providers: [NgxLoadingSpinnerConfigService]
})
export class NgxLoadingSpinnerDirective {
  private el = inject(ElementRef);
  private vcRef = inject(ViewContainerRef);
  private renderer = inject(Renderer2);
  private configService = inject(NgxLoadingSpinnerConfigService);


  show = input(false, {alias: 'ngx-loading'});
  config = model<NgxLoadingSpinnerConfig>({} as NgxLoadingSpinnerConfig);
  template = input<TemplateRef<any> | null>(null);

  private spinnerComponentRef = signal<ComponentRef<NgxLoadingSpinnerComponent> | undefined>(undefined);

  constructor() {
    // Create / destroy the spinner when `ngx-loading` toggles.
    effect(() => {
      const show = this.show();
      untracked(() => show ? this.createSpinner() : this.destroySpinner());
    });

    // Push config / template changes into an already visible spinner.
    effect(() => {
      const ref = this.spinnerComponentRef();
      const config = this.config();
      const template = this.template();
      if (ref) {
        untracked(() => this.applyInputs(ref, config, template));
      }
    });

    inject(DestroyRef).onDestroy(() => this.destroySpinner());

    this.setPosition();
  }

  setPosition() {
    const elPosition = this.el.nativeElement.style.position;
    if (elPosition === 'relative' || elPosition === 'absolute') {
      return;
    }

    this.el.nativeElement.style.position = 'relative';
  }

  createSpinner() {
    if (this.spinnerComponentRef()) {
      return;
    }

    const ref = this.vcRef.createComponent(NgxLoadingSpinnerComponent);
    this.applyInputs(ref, this.config(), this.template());

    this.renderer.appendChild(this.vcRef.element.nativeElement, ref.location.nativeElement);
    this.spinnerComponentRef.set(ref);
  }

  destroySpinner() {
    const ref = this.spinnerComponentRef();
    if (ref) {
      ref.destroy();
      this.spinnerComponentRef.set(undefined);
    }
  }

  private applyInputs(ref: ComponentRef<NgxLoadingSpinnerComponent>, config: NgxLoadingSpinnerConfig, template: TemplateRef<any> | null) {
    ref.setInput('config', this.configService.normalizeConfigs(config));
    ref.setInput('template', template);
  }
}
