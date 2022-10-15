import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Bombero, BomberoRelations, Incendio, Maquina} from '../models';
import {IncendioRepository} from './incendio.repository';
import {MaquinaRepository} from './maquina.repository';

export class BomberoRepository extends DefaultCrudRepository<
  Bombero,
  typeof Bombero.prototype.id,
  BomberoRelations
> {

  public readonly incendios: HasManyRepositoryFactory<Incendio, typeof Bombero.prototype.id>;

  public readonly maquina: HasOneRepositoryFactory<Maquina, typeof Bombero.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('IncendioRepository') protected incendioRepositoryGetter: Getter<IncendioRepository>, @repository.getter('MaquinaRepository') protected maquinaRepositoryGetter: Getter<MaquinaRepository>,
  ) {
    super(Bombero, dataSource);
    this.maquina = this.createHasOneRepositoryFactoryFor('maquina', maquinaRepositoryGetter);
    this.registerInclusionResolver('maquina', this.maquina.inclusionResolver);
    this.incendios = this.createHasManyRepositoryFactoryFor('incendios', incendioRepositoryGetter,);
    this.registerInclusionResolver('incendios', this.incendios.inclusionResolver);
  }
}
