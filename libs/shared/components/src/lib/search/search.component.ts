import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Search } from '@stack/models';

@Component({
  selector: 'stack-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SearchComponent implements OnInit {
  @Input() showDepartments = true;
  @Output() search = new EventEmitter<Search>();
  @ViewChild('department') department!: ElementRef<
    HTMLSelectElement | undefined
  >;
  @ViewChild('searchInput') searchInput!: ElementRef<
    HTMLInputElement | undefined
  >;
  constructor() {}

  ngOnInit(): void {}

  onSearch() {
    let department: string = '';
    let searchString: string = '';

    if (this.department && this.department.nativeElement) {
      department = this.department.nativeElement.value;
    }

    if (this.searchInput && this.searchInput.nativeElement) {
      searchString = this.searchInput.nativeElement.value;
    }

    this.search.emit({ department, searchString });
  }
}
