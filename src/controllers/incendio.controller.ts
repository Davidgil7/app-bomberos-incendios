import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Incendio} from '../models';
import {IncendioRepository} from '../repositories';

export class IncendioController {
  constructor(
    @repository(IncendioRepository)
    public incendioRepository : IncendioRepository,
  ) {}

  @post('/incendios')
  @response(200, {
    description: 'Incendio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Incendio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incendio, {
            title: 'NewIncendio',
            exclude: ['id'],
          }),
        },
      },
    })
    incendio: Omit<Incendio, 'id'>,
  ): Promise<Incendio> {
    return this.incendioRepository.create(incendio);
  }

  @get('/incendios/count')
  @response(200, {
    description: 'Incendio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Incendio) where?: Where<Incendio>,
  ): Promise<Count> {
    return this.incendioRepository.count(where);
  }

  @get('/incendios')
  @response(200, {
    description: 'Array of Incendio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Incendio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Incendio) filter?: Filter<Incendio>,
  ): Promise<Incendio[]> {
    return this.incendioRepository.find(filter);
  }

  @patch('/incendios')
  @response(200, {
    description: 'Incendio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incendio, {partial: true}),
        },
      },
    })
    incendio: Incendio,
    @param.where(Incendio) where?: Where<Incendio>,
  ): Promise<Count> {
    return this.incendioRepository.updateAll(incendio, where);
  }

  @get('/incendios/{id}')
  @response(200, {
    description: 'Incendio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Incendio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Incendio, {exclude: 'where'}) filter?: FilterExcludingWhere<Incendio>
  ): Promise<Incendio> {
    return this.incendioRepository.findById(id, filter);
  }

  @patch('/incendios/{id}')
  @response(204, {
    description: 'Incendio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incendio, {partial: true}),
        },
      },
    })
    incendio: Incendio,
  ): Promise<void> {
    await this.incendioRepository.updateById(id, incendio);
  }

  @put('/incendios/{id}')
  @response(204, {
    description: 'Incendio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() incendio: Incendio,
  ): Promise<void> {
    await this.incendioRepository.replaceById(id, incendio);
  }

  @del('/incendios/{id}')
  @response(204, {
    description: 'Incendio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.incendioRepository.deleteById(id);
  }
}
