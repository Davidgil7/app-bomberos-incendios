import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Incendio} from './incendio.model';
import {Maquina} from './maquina.model';

@model()
export class Bombero extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
  })
  correo?: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  rango: string;

  @hasMany(() => Incendio)
  incendios: Incendio[];

  @hasOne(() => Maquina)
  maquina: Maquina;

  constructor(data?: Partial<Bombero>) {
    super(data);
  }
}

export interface BomberoRelations {
  // describe navigational properties here
}

export type BomberoWithRelations = Bombero & BomberoRelations;
