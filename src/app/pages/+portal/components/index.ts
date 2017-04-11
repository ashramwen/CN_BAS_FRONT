import { SIDENAV_CMP } from './side-nav-content';
import { ToolbarCmp } from './toolbar/toolbar.component';
import { SWIPE_COMPONENTS } from './swipe-wrapper/index';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { SIDENAV_COMPONENTS } from './side-nav-container/index';

export const LAYOUT_CMP = [
  ...SIDENAV_COMPONENTS,
  ...SIDENAV_CMP,
  ...SWIPE_COMPONENTS,
  ToolbarCmp
];
