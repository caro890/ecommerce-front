import { Promo } from "../types/Promos/Promo";
import { BackendClient, base } from "./BackendClient";


export class PromosService extends BackendClient<Promo> {
    protected baseUrl: string = base + "promociones";

    async getHabilitadosBySucursalId(sucursalId: Number): Promise<Promo[] | undefined> {
        const response = await fetch(`${this.baseUrl}/getHabilitadosPorSucursal/${sucursalId}`);
        if (!response.ok) {
          return undefined;
        }
        const data = await response.json();
        return data as Promo[];
    }
}