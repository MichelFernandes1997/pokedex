/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://teste:teste123@mongo:27017/pokedex`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ),
    UsersModule,
    PokemonsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
