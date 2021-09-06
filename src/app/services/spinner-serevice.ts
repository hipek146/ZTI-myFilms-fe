import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {Injectable} from "@angular/core";
import {ComponentPortal} from "@angular/cdk/portal";
import {SpinnerComponent} from "../spinner/spinser.component";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  public show() {

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    const spinnerOverlayPortal = new ComponentPortal(SpinnerComponent);
    this.overlayRef.detach();
    this.overlayRef.attach(spinnerOverlayPortal);
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
