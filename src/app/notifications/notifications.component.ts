import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from "@angular/core";
import {CONTAINER_DATA} from "../services/notifications-service";
import {Alert} from "bootstrap";

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements AfterViewInit{
  message: string = '';
  color: string = 'light';

  @ViewChild('alert')
  alert!: ElementRef

  constructor(@Inject(CONTAINER_DATA) public componentData: any) {
    this.message = componentData.message;
    this.color = componentData.color;
  }

  ngAfterViewInit(): void {
    const instance = new Alert(this.alert.nativeElement);
    setTimeout(() => instance.close(), 2000);
  }
}
