import * as L from 'leaflet';

export const LevelPickerControl: typeof L.Control = L.Control.extend({
    onAdd: function(map: L.Map) {
      let container: HTMLDivElement = <HTMLDivElement>L.DomUtil.create('div');
      container.classList.add('level-picker-container');
      let levelListDiv = L.DomUtil.create('div');
      levelListDiv.classList.add('level-list');
      container.appendChild(levelListDiv);

      map.on('select-layer', (event) => {
        let levels: Array<{ text: string; value: number; }> = event['levels'];

        while (levelListDiv.childNodes.length) {
          levelListDiv.removeChild(levelListDiv.childNodes.item(0));
        }

        let items = levels.map(level => {
          let item: HTMLSpanElement = L.DomUtil.create('span');
          item.classList.add('level-item');
          item.addEventListener('click', () => {
            if (item.classList.contains('active')) {
              return;
            }
            for (let i = 0; i < levelListDiv.childNodes.length; i++) {
              (<HTMLSpanElement>levelListDiv.childNodes.item(i)).classList.remove('active');
            }
            item.classList.add('active');
            map.fire('select-level', { level: level.value });
          });
          item.textContent = level.text;
          levelListDiv.appendChild(item);
          return item;
        });

        if (items.length) {
          items[0].click();
        }
      });

      return container;
    },
    onRemove: function(map: L.Map) {
        // Nothing to do here
    }
});

// <div class="level-picker-container">
//   <div class="level-list">
//     <span *ngFor="let item of levelItems"
//       class="level-item" 
//       [class.active]="currentLevel === item" 
//       (click)="itemClick(item)"
//     >{{item.text}}</span>
//   </div>
// </div>


export const SelectLayerHandler = L.Handler.extend({
  addHooks: function () {
    L.DomEvent.on(<any>document, 'click', this.selectLayer, this);
  },

  removeHooks: function () {
    L.DomEvent.off(<any>document, 'click', this.selectLayer, this);
  },

  selectLayer: function (event) {
    event
    console.log(event);
  }
});
