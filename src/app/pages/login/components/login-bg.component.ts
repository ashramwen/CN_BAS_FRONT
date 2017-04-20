import {
  Component,
  HostListener,
  AfterViewInit,
  OnDestroy,
  HostBinding,
  NgZone
} from '@angular/core';

import { particles } from './particles';

@Component({
  selector: 'bas-login-bg',
  template: `
    <div id="bg-animation"></div>
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host{
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-align: center;
        overflow: hidden;
        background-image: url(./assets/img/login-bg.png) ;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: bottom; 
        background-size: cover;
        overflow: hidden;
      }
      :host #bg-animation {
          width: 100%;
          height: 100%;
          background-color: rgba(44, 161, 244, 0.2);
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 0;
      }
    `
  ]
})
export class LoginBgComponent implements AfterViewInit, OnDestroy {

  @HostBinding('style.background-position-y.px')
  public backgroundPositionY: number;

  private _pJS: any;
  private imgSize: {
    height: number;
    width: number;
  } = null;

  constructor(
    private _zone: NgZone
  ) { }

  @HostListener('window:resize')
  public onResize(event) {
    this._recalcBgPosition();
  }

  public ngAfterViewInit() {
    this.renderAnimation();
    this._getImgSize();
  }

  public ngOnDestroy() {
    if (this._pJS) {
      this._pJS.fn.vendors.destroy();
    }
  }

  private renderAnimation() {
    this._pJS = particles('bg-animation', {
      particles: {
        color: '#fff',
        shape: 'circle', // "circle", "edge" or "triangle"
        opacity: 1,
        size: 4,
        size_random: true,
        nb: 150,
        line_linked: {
          enable_auto: true,
          distance: 100,
          color: '#fff',
          opacity: 1,
          width: 1,
          condensed_mode: {
            enable: false,
            rotateX: 600,
            rotateY: 600
          }
        },
        anim: {
          enable: true,
          speed: 1
        }
      },
      interactivity: {
        enable: true,
        mouse: {
          distance: 300
        },
        detect_on: 'canvas', // "canvas" or "window"
        mode: 'grab',
        line_linked: {
          opacity: .5
        },
        events: {
          onclick: {
            enable: true,
            mode: 'push', // "push" or "remove"
            nb: 4
          }
        }
      },
      /* Retina Display Support */
      retina_detect: true
    });
  }

  private _recalcBgPosition() {
    if (!this.imgSize) {
      return;
    }
    let fitSize = this._getFitSize();
    this.backgroundPositionY = window.screen.height - fitSize.height / 3 * 2;
  }

  private _getImgSize() {
    let img = new Image();
    img.src = './assets/img/login-bg.png';
    img.onload = () => {
      this.imgSize = img;
      this._zone.run(() => {
        this._recalcBgPosition();
      });
    };
  }

  private _getFitSize() {
    let ratioW = this.imgSize.width / window.screen.width;
    let ratioH = this.imgSize.height / window.screen.height;
    let ratio: number = null;
    ratio = ratioW > ratioH ? ratioH : ratioW;

    return {
      height: this.imgSize.height / ratio,
      width: this.imgSize.width / ratio
    };
  }

}
