import { Pipe, PipeTransform } from '@angular/core';
import { Table } from './table.model';

@Pipe({
  name: 'filtertables',
})
export class FilterTablesPipe implements PipeTransform {
  transform(tables: Table[], searchString: string): any {
    return tables
      .filter(
        table =>
          table.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1
      )
      .slice();
  }
}
