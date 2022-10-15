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
  Incendio,
} from '../models';
import {BomberoRepository} from '../repositories';

export class BomberoIncendioController {
  constructor(
    @repository(BomberoRepository) protected bomberoRepository: BomberoRepository,
  ) { }

  @get('/bomberos/{id}/incendios', {
    responses: {
      '200': {
        description: 'Array of Bombero has many Incendio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Incendio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Incendio>,
  ): Promise<Incendio[]> {
    return this.bomberoRepository.incendios(id).find(filter);
  }

  @post('/bomberos/{id}/incendios', {
    responses: {
      '200': {
        description: 'Bombero model instance',
        content: {'application/json': {schema: getModelSchemaRef(Incendio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Bombero.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incendio, {
            title: 'NewIncendioInBombero',
            exclude: ['id'],
            optional: ['bomberoId']
          }),
        },
      },
    }) incendio: Omit<Incendio, 'id'>,
  ): Promise<Incendio> {
    return this.bomberoRepository.incendios(id).create(incendio);
  }

  @patch('/bomberos/{id}/incendios', {
    responses: {
      '200': {
        description: 'Bombero.Incendio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incendio, {partial: true}),
        },
      },
    })
    incendio: Partial<Incendio>,
    @param.query.object('where', getWhereSchemaFor(Incendio)) where?: Where<Incendio>,
  ): Promise<Count> {
    return this.bomberoRepository.incendios(id).patch(incendio, where);
  }

  @del('/bomberos/{id}/incendios', {
    responses: {
      '200': {
        description: 'Bombero.Incendio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Incendio)) where?: Where<Incendio>,
  ): Promise<Count> {
    return this.bomberoRepository.incendios(id).delete(where);
  }
}
