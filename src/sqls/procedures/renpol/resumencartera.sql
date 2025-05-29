insert into codigoscartera (id, codigo, nombre, direc, ciudad, estado, zona, status, cia)
values (17, '17', 'SUC.67', 'MERIDA', 'MERIDA', 'YUCACTAN', '01', 'A', 1);
insert into codigoscartera (id, codigo, nombre, direc, ciudad, estado, zona, status, cia)
values (27, '27', 'ACANCEH', 'ACANCEH', 'ACANCEH', 'YUCACTAN', '03', 'A', 1);

select e.anucartera, c.tiplazo, e.descri, 
sum(a.importe), 
sum( (case a.tipo when 'AB' then rob else 0 end )) as bonif,
sum( (case a.tipo when 'AR' then rob else 0 end )) as recar,
sum( 
    round( 
        ( precon * (16 / 100 + 1) - enganc )  / (b.nulets * ( a.importe / (canle +.01)) + .01 ), 
        2)
    )  as valmcia
    
from polizas g join renpol a on g.id = a.idpoliza
join ventas b on a.idventa = b.idventa
        join car_corlarpzodet d on b.qom = d.qom and b.nulets = d.nulets
        join car_corlarpzo c on d.idcorlarpzo = c.id
        join car_anuscartera e on
        ( year(b.fecha) >= e.anuini and year(b.fecha) <= e.anufin)
        and d.idanucartera = e.id
        where g.fecha between '2025-01-01' and '2025-12-31'  and b.siono='*' 
group by  c.tiplazo, e.anucartera, e.descri
;
