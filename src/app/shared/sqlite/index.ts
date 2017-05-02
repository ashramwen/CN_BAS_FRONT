import {
  ConnectionOptions,
  createConnection,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'bas-typeorm';

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 500
  })
  public name: string;

  @Column('text')
  public description: string;

  @Column()
  public fileName: string;

  @Column('int')
  public views: number;

  @Column()
  public isPublished: boolean;
}

let options: ConnectionOptions = {
  driver: {
    type: 'websql',
    database: 'test',
    extra: {
      version: 1,
      description: 'test database',
      size: 2 * 1024 * 1024
    }
  },
  entities: [
    Photo
  ],
  autoSchemaSync: true
};
export function initDB() {
  debugger;
  createConnection(options)
    .then(async (connection) => {
      let photo = new Photo();
      photo.name = 'Me and Bears';
      photo.description = 'I am near polar bears';
      photo.fileName = 'photo-with-bears.jpg';
      photo.views = 1;
      photo.isPublished = true;

      await connection.entityManager
        .persist(photo);
      console.log('Photo has been saved');
    })
    .catch((error) => {
      debugger;
      console.error(`Connection Error ${JSON.stringify(error)}`);
    });
}
