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
import { Clientes } from './clientes/entities';
import { VendedoresModule } from './vendedores/vendedores.module';
import { Vendedor } from './vendedores/entities';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { Proveedor } from './proveedores/entities';
import { RegimenesModule } from './regimenes/regimenes.module';
import { Regimenes } from './regimenes/entities';
import { UsocfdiModule } from './usdocfdi/usocfdi.module';
import { Usocfdi } from './usdocfdi/entities';
import { PromotoresModule } from './promotores/promotores.module';
import { Promotor } from './promotores/entities';
import { AvalesModule } from './avales/avales.module';
import { Avales } from './avales/entities';
import { VentasModule } from './ventas/ventas.module';
import { CartapromModule } from './cartaprom/cartaprom.module';
import { Cartaprom } from './cartaprom/entities';
import { Ventas, Ubivtas } from './ventas/entities';
import { MovclisModule } from './movclis/movclis.module';
import { Movclis } from './movclis/entities';
import { ConceptosModule } from './conceptos/conceptos.module';
import { Conceptos } from './conceptos/entities';
import { FacturasModule } from './facturas/facturas.module';
import { Facturas } from './facturas/entities';
import { RenfacModule } from './renfac/renfac.module';
import { Renfac } from './renfac/entities';
import { PolizasModule } from './polizas/polizas.module';
import { Car_anuscartera, Polizas, Car_corlarpzo, Car_corlarpzodet } from './polizas/entities';
import { RenpolModule } from './renpol/renpol.module';
import { Renpol } from './renpol/entities';
import { Nombres } from './clientes/entities';
import { UbivtasModule } from './ubivtas/ubivtas.module';
import { MetodopagoModule } from './metodopago/metodopago.module';
import { Metodopago } from './metodopago/entities';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { Datosolicitud, Solicitudes } from './solicitudes/entities';
import { CodigoscajaModule } from './codigoscaja/codigoscaja.module';
import { Codigoscaja, Codigosusuario } from './codigoscaja/entities';
import { CodigoscarteraModule } from './codigoscartera/codigoscartera.module';
import { Codigoscartera } from './codigoscartera/entities';

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
  UsocfdiModule,
  MetodopagoModule,
  CodigoscajaModule,

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
        Clientes, Vendedor, Proveedor, Regimenes, Promotor, Usocfdi,
        Avales, Ventas, Cartaprom, Movclis, Conceptos, Facturas, Renfac,
        Polizas, Renpol, Nombres, Ubivtas, Metodopago, 
        Solicitudes, Datosolicitud, Codigoscaja, Codigoscartera,
        Codigosusuario, Car_anuscartera, Car_corlarpzo, Car_corlarpzodet,         
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
    UsocfdiModule,
    PromotoresModule,
    AvalesModule,
    VentasModule,
    CartapromModule,
    MovclisModule,
    ConceptosModule,
    FacturasModule,
    RenfacModule,
    PolizasModule,
    RenpolModule,
    UbivtasModule,
    MetodopagoModule,
    SolicitudesModule,
    CodigoscajaModule,
    CodigoscarteraModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
