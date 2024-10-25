import { IsDefined, IsNumber, IsString } from "class-validator"

export class CreateBookDto {

    @IsDefined()
    @IsString()
    title: string
    @IsDefined()
    @IsString()
    author: string
    @IsDefined()
    @IsString()
    isbn: string
    @IsDefined()
    @IsNumber()
    publishYear: number

}
