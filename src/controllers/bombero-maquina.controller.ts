import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Bombero,
  Maquina,
} from '../models';
import {BomberoRepository} from '../repositories';

export class BomberoMaquinaController {
  constructor(
    @repository(BomberoRepository) protected bomberoRepository: BomberoRepository,
  ) { }

  @get('/bomberos/{id}/maquina', {
    responses: {
      '200': {
        description: 'Bombero has one Maquina',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Maquina),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Maquina>,
  ): Promise<Maquina> {
    return this.bomberoRepository.maquina(id).get(filter);
  }

  @post('/bomberos/{id}/maquina', {
    responses: {
      '200': {
        description: 'Bombero model instance',
        content: {'application/json': {schema: getModelSchemaRef(Maquina)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Bombero.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maquina, {
            title: 'NewMaquinaInBombero',
            exclude: ['id'],
            optional: ['bomberoId']
          }),
        },
      },
    }) maquina: Omit<Maquina, 'id'>,
  ): Promise<Maquina> {
    return this.bomberoRepository.maquina(id).create(maquina);
  }

  @patch('/bomberos/{id}/maquina', {
    responses: {
      '200': {
        description: 'Bombero.Maquina PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maquina, {partial: true}),
        },
      },
    })
    maquina: Partial<Maquina>,
    @param.query.object('where', getWhereSchemaFor(Maquina)) where?: Where<Maquina>,
  ): Promise<Count> {
    return this.bomberoRepository.maquina(id).patch(maquina, where);
  }

  @del('/bomberos/{id}/maquina', {
    responses: {
      '200': {
        description: 'Bombero.Maquina DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Maquina)) where?: Where<Maquina>,
  ): Promise<Count> {
    return this.bomberoRepository.maquina(id).delete(where);
  }
}
