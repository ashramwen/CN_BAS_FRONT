import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ContentChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorItemCmp } from '../error-item/error-item.component';

@Component({
  selector: 'error-container',
  templateUrl: './error-container.component.html',
  styleUrls: ['./error-container.component.scss']
})
export class ErrorContainerCmp implements OnChanges, AfterViewInit {

  @Input() control: FormControl;
  @Input() show: boolean;

  @ContentChildren(ErrorItemCmp)
  private errorItems: QueryList<ErrorItemCmp>;

  ngOnChanges(changes: SimpleChanges) {
    if (
      !changes['control'] ||
      changes['control'].currentValue === changes['control'].previousValue
      || !this.errorItems
    ) return;
    this.errorItems.toArray()
      .forEach(item => {
        item.control = changes['control'].currentValue;
      });
  }

  ngAfterViewInit() {
    if (!this.errorItems) return;
    this.errorItems.toArray()
      .forEach(item => {
        // avoid change detection
        setTimeout(() => {
          item.control = this.control;
        });
      });
  }
  
}
