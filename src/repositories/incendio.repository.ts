import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Incendio, IncendioRelations} from '../models';

export class IncendioRepository extends DefaultCrudRepository<
  Incendio,
  typeof Incendio.prototype.id,
  IncendioRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Incendio, dataSource);
  }
}
