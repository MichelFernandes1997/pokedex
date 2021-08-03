import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreatePokemonDto } from './create-pokemon.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;
}
