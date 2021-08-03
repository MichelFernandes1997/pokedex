/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class UsersCreatedResponse {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    mail: string;
}

export class UsersUpdatedResponse {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    mail: string;
}

export class UsersAuthResponse {
    @ApiProperty()
    access_token: string;
}