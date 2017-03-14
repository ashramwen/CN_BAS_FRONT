import { SIDENAV_CMP } from './side-nav';
import { ToolbarCmp } from './toolbar/toolbar.component';
import { SWIPE_COMPONENTS } from './swipe-wrapper/index';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export const LAYOUT_CMP = [
  ...SIDENAV_CMP,
  ...SWIPE_COMPONENTS,
  ToolbarCmp
];
