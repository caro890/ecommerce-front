import { Base } from "../Base";
import { Domicilio } from "../Domicilio/Domicilio";
import { Sucursal } from "../Empresa/Sucursal";
import { Cliente } from "../Personas/Cliente";
import { DetallePedido, DetallePedidoPost } from "./DetallePedido";

export enum Estado {
    PREPARACION,
    PENDIENTE,
    CANCELADO,
    RECHAZADO,
    ENTREGADO
}

export enum TipoEnvio {
    DELIVERY,
    TAKE_AWAY
}

export enum FormaPago {
    EFECTIVO,
    MERCADO_PAGO
}

export interface Pedido extends Base {
    horaEstimadaFinalizacion: string, //cambiar por hora
    total: number,
    totalCosto: number,
    estadoPedido: Estado,
    tipoEnvio: TipoEnvio,
    formaPago: FormaPago,
    fechaPedido: Date,
    domicilio?: Domicilio,
    sucursal: Sucursal,
    //factura: Factura,
    //empleado: Empleado,
    cliente: Cliente,
    detallePedidos: DetallePedido[]
}

export interface PedidoPost {
    estadoPedido: string,
    tipoEnvio: string,
    formaPago: string,
    // fechaPedido: Date,
    domicilio?: Domicilio,
    idSucursal: number,
    idCliente: number,
    detallePedidos: DetallePedidoPost[]
}

export function calcularTotal(detalles: DetallePedido[]) : number {
    var tot = 0;

    detalles.forEach((detalle: DetallePedido) => {
        tot = tot + detalle.subTotal;
    });

    return tot;
}