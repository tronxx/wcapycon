import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateVentasDto {

    @IsInt()
    idventa: number;

    @IsString()
    codigo: string;

    @IsInt()
    idcliente: number;

    @IsString()
    fecha: string;

    @IsInt()
    idtienda: number;

    @IsString()
    siono: string;

    @IsString()
    qom: string;

    @IsString()
    ticte: string;

    @IsInt()
    letra1: number;

    @IsNumber()
    enganc: number;

    @IsInt()
    nulets: number;

    @IsNumber()
    canle: number;

    @IsNumber()
    bonifi: number;

    @IsNumber()
    servicio: number;

    @IsNumber()
    precon: number;

    @IsInt()
    idvendedor: number;

    @IsNumber()
    comision: number;
    
    @IsNumber()
    prodfin: number;

    @IsInt()
    idcarta: number;

    @IsInt()
    idfactura: number;

    @IsInt()
    idpromotor: number;

    @IsNumber()
    comisionpromotor: number;

    @IsNumber()
    cargos: number;

    @IsNumber()
    abonos: number;

    @IsInt()
    idubica: number;

    @IsString()
    status: string;

    @IsInt()
    cia: number;

    @IsString()
    fechasaldo: string;
 
}