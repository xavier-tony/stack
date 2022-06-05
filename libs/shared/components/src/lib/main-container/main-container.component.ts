import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stack-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent implements OnInit {
  constructor() {}
  items = Array.from(Array(50)).map((x) => Math.random());

  navigate(item: number) {
    console.log(item);
  }
  ngOnInit(): void {
    console.log(this.items);
  }
}
