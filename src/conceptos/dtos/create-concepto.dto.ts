import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateConceptoDto {

    @IsString()
    concepto: string;

}
