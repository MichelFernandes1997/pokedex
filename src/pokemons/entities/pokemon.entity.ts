import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, createConnection } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require('mongoose-auto-increment');

const connection = createConnection(
  `mongodb://teste:teste123@mongo:27017/pokedex`,
);

autoIncrement.initialize(connection);

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  type: string;
}

const PokemonSchemaItermediate = SchemaFactory.createForClass(Pokemon);

export const PokemonSchema = PokemonSchemaItermediate.plugin(
  autoIncrement.plugin,
  {
    model: 'Pokemon',
    field: 'pokemonId',
    startAt: 1,
  },
);
