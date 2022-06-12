import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'stack-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes['data'] &&
      changes['data'].currentValue !== changes['data'].previousValue
    ) {
      if (this.data && this.data.length > 0) {
        this.columnsToDisplay = Object.keys(this.data[0]);
        this.displayedColumns = this.columnsToDisplay.slice();
      }
    }
  }
  @Input() tableName: string | undefined;
  @Input() data: object[] | undefined;
  columnsToDisplay: string[] = [];
  displayedColumns: string[] = [];

  ngOnInit(): void {}
}
