import {Entity, model, property, hasMany} from '@loopback/repository';
import {Incendio} from './incendio.model';

@model()
export class Maquina extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  marcacion: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
  })
  kilometraje?: string;

  @property({
    type: 'string',
  })
  tanque_combustible?: string;

  @property({
    type: 'string',
  })
  deposito_agua?: string;

  @property({
    type: 'string',
  })
  bomberoId?: string;

  @hasMany(() => Incendio)
  incendios: Incendio[];

  constructor(data?: Partial<Maquina>) {
    super(data);
  }
}

export interface MaquinaRelations {
  // describe navigational properties here
}

export type MaquinaWithRelations = Maquina & MaquinaRelations;
