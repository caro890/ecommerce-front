import { Pedido } from "../types/Pedidos/Pedido";
import { BackendClient, base } from "./BackendClient";
import { PedidoPost } from "../types/Pedidos/Pedido";
import { PreferenceMP } from "../types/MercadoPago/PreferenceMP";

export class PedidoService extends BackendClient<Pedido> {
    protected baseUrl: string = base + "pedidos";

    async create(data: PedidoPost): Promise<Pedido | undefined> {
        const response = await fetch(`${this.baseUrl}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if(!response.ok){
          return undefined;
        }
        const newData = await response.json();
        return newData as Pedido;
    }

    //get preference id para mercado pago
    async getPreferenceMP(pedido: Pedido) : Promise<PreferenceMP | undefined> {
      const response = await fetch(`${this.baseUrl}/create_preference_mp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });
      if(!response.ok){
        return undefined;
      }
      const newData = await response.json();
      return newData as PreferenceMP;
    }
}