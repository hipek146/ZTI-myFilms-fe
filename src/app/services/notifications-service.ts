import {Injectable, InjectionToken, Injector} from "@angular/core";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal, PortalInjector} from "@angular/cdk/portal";
import {NotificationsComponent} from "../notifications/notifications.component";

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private overlayRef: OverlayRef | null = null;

  constructor(private injector: Injector, private overlay: Overlay) {}

  success(message: string) {
    this.show(message, 'success');
  }

  danger(message: string) {
    this.show(message, 'danger');
  }

  public show(message: string, color: string) {

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    const spinnerOverlayPortal = new ComponentPortal(NotificationsComponent,  null, this.createInjector({message, color}));
    this.overlayRef.detach();
    this.overlayRef.attach(spinnerOverlayPortal);
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  createInjector(dataToPass: any): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(CONTAINER_DATA, dataToPass);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
