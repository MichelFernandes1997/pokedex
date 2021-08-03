import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const pokemon = await new this.pokemonModel(createPokemonDto);

    return await pokemon.save();
  }

  async findAll() {
    return await this.pokemonModel.find({}, { _id: 1, name: 1 });
  }

  async findOne(id: string) {
    return await this.pokemonModel.findById(id);
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return await this.pokemonModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updatePokemonDto,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return await this.pokemonModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
