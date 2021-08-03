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

  create(createPokemonDto: CreatePokemonDto) {
    const pokemon = new this.pokemonModel(createPokemonDto);

    return pokemon.save();
  }

  findAll() {
    return this.pokemonModel.find({}, { _id: 1, name: 1 });
  }

  findOne(id: string) {
    return this.pokemonModel.findById(id);
  }

  update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonModel.findByIdAndUpdate(
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

  remove(id: string) {
    return this.pokemonModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
