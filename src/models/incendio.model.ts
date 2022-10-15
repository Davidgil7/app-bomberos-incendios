import {Entity, model, property} from '@loopback/repository';

@model()
export class Incendio extends Entity {
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
  nombre: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  herido: string;

  @property({
    type: 'string',
    required: true,
  })
  difuntos: string;

  @property({
    type: 'string',
    required: true,
  })
  bomberosqueatendieron: string;

  @property({
    type: 'string',
  })
  bomberoId?: string;

  @property({
    type: 'string',
  })
  maquinaId?: string;

  constructor(data?: Partial<Incendio>) {
    super(data);
  }
}

export interface IncendioRelations {
  // describe navigational properties here
}

export type IncendioWithRelations = Incendio & IncendioRelations;
