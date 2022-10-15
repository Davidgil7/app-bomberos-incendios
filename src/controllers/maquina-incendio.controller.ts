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
  Maquina,
  Incendio,
} from '../models';
import {MaquinaRepository} from '../repositories';

export class MaquinaIncendioController {
  constructor(
    @repository(MaquinaRepository) protected maquinaRepository: MaquinaRepository,
  ) { }

  @get('/maquinas/{id}/incendios', {
    responses: {
      '200': {
        description: 'Array of Maquina has many Incendio',
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
    return this.maquinaRepository.incendios(id).find(filter);
  }

  @post('/maquinas/{id}/incendios', {
    responses: {
      '200': {
        description: 'Maquina model instance',
        content: {'application/json': {schema: getModelSchemaRef(Incendio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Maquina.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incendio, {
            title: 'NewIncendioInMaquina',
            exclude: ['id'],
            optional: ['maquinaId']
          }),
        },
      },
    }) incendio: Omit<Incendio, 'id'>,
  ): Promise<Incendio> {
    return this.maquinaRepository.incendios(id).create(incendio);
  }

  @patch('/maquinas/{id}/incendios', {
    responses: {
      '200': {
        description: 'Maquina.Incendio PATCH success count',
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
    return this.maquinaRepository.incendios(id).patch(incendio, where);
  }

  @del('/maquinas/{id}/incendios', {
    responses: {
      '200': {
        description: 'Maquina.Incendio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Incendio)) where?: Where<Incendio>,
  ): Promise<Count> {
    return this.maquinaRepository.incendios(id).delete(where);
  }
}
