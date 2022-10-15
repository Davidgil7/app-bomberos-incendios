import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Maquina, MaquinaRelations, Incendio} from '../models';
import {IncendioRepository} from './incendio.repository';

export class MaquinaRepository extends DefaultCrudRepository<
  Maquina,
  typeof Maquina.prototype.id,
  MaquinaRelations
> {

  public readonly incendios: HasManyRepositoryFactory<Incendio, typeof Maquina.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('IncendioRepository') protected incendioRepositoryGetter: Getter<IncendioRepository>,
  ) {
    super(Maquina, dataSource);
    this.incendios = this.createHasManyRepositoryFactoryFor('incendios', incendioRepositoryGetter,);
    this.registerInclusionResolver('incendios', this.incendios.inclusionResolver);
  }
}
