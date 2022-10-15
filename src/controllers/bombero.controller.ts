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
import {Bombero} from '../models';
import {BomberoRepository} from '../repositories';

export class BomberoController {
  constructor(
    @repository(BomberoRepository)
    public bomberoRepository : BomberoRepository,
  ) {}

  @post('/bomberos')
  @response(200, {
    description: 'Bombero model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bombero)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bombero, {
            title: 'NewBombero',
            exclude: ['id'],
          }),
        },
      },
    })
    bombero: Omit<Bombero, 'id'>,
  ): Promise<Bombero> {
    return this.bomberoRepository.create(bombero);
  }

  @get('/bomberos/count')
  @response(200, {
    description: 'Bombero model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bombero) where?: Where<Bombero>,
  ): Promise<Count> {
    return this.bomberoRepository.count(where);
  }

  @get('/bomberos')
  @response(200, {
    description: 'Array of Bombero model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bombero, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bombero) filter?: Filter<Bombero>,
  ): Promise<Bombero[]> {
    return this.bomberoRepository.find(filter);
  }

  @patch('/bomberos')
  @response(200, {
    description: 'Bombero PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bombero, {partial: true}),
        },
      },
    })
    bombero: Bombero,
    @param.where(Bombero) where?: Where<Bombero>,
  ): Promise<Count> {
    return this.bomberoRepository.updateAll(bombero, where);
  }

  @get('/bomberos/{id}')
  @response(200, {
    description: 'Bombero model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bombero, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Bombero, {exclude: 'where'}) filter?: FilterExcludingWhere<Bombero>
  ): Promise<Bombero> {
    return this.bomberoRepository.findById(id, filter);
  }

  @patch('/bomberos/{id}')
  @response(204, {
    description: 'Bombero PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bombero, {partial: true}),
        },
      },
    })
    bombero: Bombero,
  ): Promise<void> {
    await this.bomberoRepository.updateById(id, bombero);
  }

  @put('/bomberos/{id}')
  @response(204, {
    description: 'Bombero PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bombero: Bombero,
  ): Promise<void> {
    await this.bomberoRepository.replaceById(id, bombero);
  }

  @del('/bomberos/{id}')
  @response(204, {
    description: 'Bombero DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bomberoRepository.deleteById(id);
  }
}
