import { Component } from '@angular/core';

@Component({
  selector: 'stack-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent {
  items = Array.from(Array(50)).map(x => Math.random());

  navigate(item: number) {
    console.log(item);
  }
}
