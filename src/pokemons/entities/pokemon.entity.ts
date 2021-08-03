import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, createConnection } from 'mongoose';
import { ConfigModule } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoIncrement = require('mongoose-auto-increment');

ConfigModule.forRoot();

const connection = createConnection(
  `${process.env.ENV === 'development' ? 'mongodb' : 'mongodb+srv'}://${
    process.env.DB_USER
  }:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
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
