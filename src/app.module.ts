import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlmacenesModule } from './almacenes/almacenes.module';
import { AlmacenesController } from './almacenes/almacenes.controller';
import { Almacenes } from './almacenes/entities';
import { ChoferesModule } from './choferes/choferes.module';
import { Chofer } from './choferes/entities';
import { Cia } from './cias/entities';
import { CiasModule } from './cias/cias.module';
import { TalleresModule } from './talleres/talleres.module';
import { Talleres } from './talleres/entities';
import { MarcasvehModule } from './marcasveh/marcasveh.module';
import { Marcasveh } from './marcasveh/entities';
import { ZonasModule } from './zonas/zonas.module';
import { Zonas } from './zonas/entities'
import { CombustModule } from './combust/combust.module';
import { Combust } from './combust/entities'
import { PrecioscombModule } from './precioscomb/precioscomb.module';
import { Precioscomb} from './precioscomb/entities';
import { CiudadesModule } from './ciudades/ciudades.module';
import { Ciudades } from './ciudades/entities';
import { EstadosModule } from './estados/estados.module';
import { Estados } from './estados/entities';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { Vehiculos } from './vehiculos/entities';
import { ServmantosModule } from './servmantos/servmantos.module';
import { ServMantos } from './servmantos/entities'
import { ServmantosxVehiculo } from './servmantos/entities'
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuarios } from './usuarios/entities';
import { PoligasModule } from './poligas/poligas.module';
import { Poligas } from './poligas/entities';
import { RenpogasController } from './renpogas/renpogas.controller';
import { RenpogasModule } from './renpogas/renpogas.module';
import { Renpogas } from './renpogas/entities';
import { PoliservController } from './poliserv/poliserv.controller';
import { PoliservModule } from './poliserv/poliserv.module';
import { Poliserv } from './poliserv/entities';
import { RenposervModule } from './renposerv/renposerv.module';
import { Renposerv } from './renposerv/entities';
import { AccesoriosModule } from './accesorios/accesorios.module';
import { config } from "dotenv";
import { InformecombModule } from './informecomb/informecomb.module';
import { CiasedoctaModule } from './ciasedocta/ciasedocta.module';
import { CiasedoctaService } from './ciasedocta/ciasedocta.service';
import { CiasedoctaController } from './ciasedocta/ciasedocta.controller';
import { Ciasedocta } from './ciasedocta/entities';
import { InformeservModule } from './informeserv/informeserv.module';
import { InformeacumModule } from './informeacum/informeacum.module';
import { InvenModule } from './inven/inven.module';
import { Inven } from './inven/entities';
import { KardexModule } from './kardex/kardex.module';
import { Exist, Kardex, Series } from './kardex/entities';
import { ImprikardexModule } from './imprikardex/imprikardex.module';
import { SeriesinvenModule } from './seriesinven/seriesinven.module';
import { ClientesModule } from './clientes/clientes.module';
import { Cliente } from './clientes/entities';
import { VendedoresModule } from './vendedores/vendedores.module';
import { Vendedor } from './vendedores/entities';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { Proveedor } from './proveedores/entities';
import { RegimenesModule } from './regimenes/regimenes.module';
import { Regimenes } from './regimenes/entities';
import { UsdocfdiModule } from './usdocfdi/usdocfdi.module';
import { Usocfdi } from './usdocfdi/entities';
import { PromotoresModule } from './promotores/promotores.module';
import { Promotor } from './promotores/entities';

config();
// const   
//TYPE='mysql',
//  HOST='localhost',
//  PORT='3306',
//  DB_USERNAME='root',
//  PASSWORD='',
//  DATABASE='kardex'
//;
const modules = [
  AlmacenesModule,
  ChoferesModule,
  CiasModule,
  TalleresModule,
  MarcasvehModule,
  ZonasModule,
  CombustModule,
  PrecioscombModule,
  CiudadesModule,
  EstadosModule,
  VehiculosModule,
  ServmantosModule,
  UsuariosModule,
  PoligasModule,
  RenpogasModule,
  PoliservModule,
  RenposervModule,
  AccesoriosModule,
  InformecombModule,
  CiasedoctaModule,
  InformeservModule,
  InformeacumModule,
  InvenModule,
  KardexModule,

]

const {
  TYPE,
  HOST,
  PORT,
  DB_USERNAME,
  PASSWORD,
  DATABASE
} = process.env

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPE as any,
      host: HOST,
      port: parseInt(PORT),
      username: DB_USERNAME,
      password: PASSWORD,
      database: DATABASE,
      entities: [Almacenes, Chofer, Cia, Talleres, Marcasveh, 
        Zonas, Combust, Precioscomb, Ciudades, Estados, Vehiculos,
        ServMantos, ServmantosxVehiculo, Usuarios, Poligas, Renpogas, 
        Poliserv, Renposerv, Ciasedocta, Inven, Kardex, Exist, Series,
        Cliente, Vendedor, Proveedor, Regimenes, Promotor, Usocfdi,
         join(__dirname, './**/**/*entity*{.ts,.js}')],
      synchronize: true,
    }),
    AlmacenesModule,
    ChoferesModule,
    CiasModule,
    TalleresModule,
    MarcasvehModule,
    ZonasModule,
    CombustModule,
    PrecioscombModule,
    CiudadesModule,
    EstadosModule,
    VehiculosModule,
    ServmantosModule,
    UsuariosModule,
    PoligasModule,
    RenpogasModule,
    PoliservModule,
    RenposervModule,
    AccesoriosModule,
    InformecombModule,
    CiasedoctaModule,
    InformeservModule,
    InformeacumModule,
    InvenModule,
    KardexModule,
    ImprikardexModule,
    SeriesinvenModule,
    ClientesModule,
    VendedoresModule,
    ProveedoresModule,
    RegimenesModule,
    UsdocfdiModule,
    PromotoresModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
