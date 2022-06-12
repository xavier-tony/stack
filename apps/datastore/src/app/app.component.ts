import { Component, OnInit } from '@angular/core';
import { Search } from '@stack/models';
import { BehaviorSubject, switchMap, Observable } from 'rxjs';
import { DataService } from './data.service';
import { Table } from './table.model';

@Component({
  selector: 'stack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'datastore';
  refreshSubject = new BehaviorSubject<boolean | undefined>(undefined);
  refresh$ = this.refreshSubject.asObservable();
  users$ = this.refresh$.pipe(switchMap(() => this.dataService.getUsers()));
  logins$ = this.refresh$.pipe(switchMap(() => this.dataService.getLogins()));
  tables: Table[] = [];
  searchString: string = '';

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.addTable<object>('Users', this.users$);
    this.addTable<object>('Logins', this.logins$);
    this.addTable<object>('Teachers', this.logins$);
  }

  refresh() {
    this.refreshSubject.next(true);
  }

  filter(search: Search) {
    this.searchString = search.searchString;
  }

  addTable<T>(name: string, data$: Observable<T[]>) {
    this.tables.push({ name, data$ });
  }
}
