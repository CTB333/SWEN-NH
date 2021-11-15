import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css'],
})
export class SuccessMessageComponent implements OnInit {
  @Input() show: Boolean;
  @Input() message: String;

  @Output() changeShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  turnOff() {
    this.show = false;
    this.changeShow.emit(false);
  }
}
