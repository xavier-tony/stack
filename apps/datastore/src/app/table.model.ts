import { Observable } from 'rxjs';

export interface Table {
  name: string;
  data$: Observable<any[]>;
}
