/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `${process.env.ENV === 'development' ? 'mongodb' : 'mongodb+srv'}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
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
