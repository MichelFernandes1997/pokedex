import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PokemonDeletedResponse,
  PokemonDetailsResponse,
  PokemonListResponse,
} from '../doc/pokemon.response';

@ApiBearerAuth()
@ApiTags('pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @ApiCreatedResponse({
    type: PokemonDetailsResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createPokemonDto: CreatePokemonDto) {
    return await this.pokemonsService.create(createPokemonDto);
  }

  @ApiOkResponse({
    type: [PokemonListResponse],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.pokemonsService.findAll();
  }

  @ApiOkResponse({
    type: PokemonDetailsResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pokemonsService.findOne(id);
  }

  @ApiCreatedResponse({
    type: PokemonDetailsResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePokemonDto: UpdatePokemonDto,
  ) {
    return await this.pokemonsService.update(id, updatePokemonDto);
  }

  @ApiOkResponse({
    type: PokemonDeletedResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pokemonsService.remove(id);
  }
}
