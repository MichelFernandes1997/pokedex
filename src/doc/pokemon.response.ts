/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class PokemonListResponse {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;
}

export class PokemonDetailsResponse {
    @ApiProperty()
    _id: string;
  
    @ApiProperty()
    name: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    pokemonId: string;

    @ApiProperty()
    __v: string;
}

export class PokemonDeletedResponse {
    @ApiProperty()
    n: number;

    @ApiProperty()
    ok: number;

    @ApiProperty()
    deletedCount: number;
}