import { Injectable } from '@angular/core';
import { Thing } from '../../models/thing.interface';
import { DeviceService } from '../../providers/device.service';
import { BasORM } from '../orm.service';

@Injectable()
export class SyncronizeService {
  constructor(
    private _orm: BasORM,
    private _thingService: DeviceService
  ){ }

  public async sync() {
    return await this.syncThings();
  }

  private async syncThings() {
    try {
      // tend to use timestamp instead after sync logic is done
      let thingRepo = this._orm.connection.getRepository(Thing);
      let result = await thingRepo.findAndCount();
      if (result[1] !== 0) return;
      let things = await this._thingService.getAllThings();
      thingRepo.persist(things.map((t) => {
        let _t = new Thing();
        Object.assign(_t, t);
        return _t;
      }));
    } catch (e) {
      console.log(e);
    }
  }
}
