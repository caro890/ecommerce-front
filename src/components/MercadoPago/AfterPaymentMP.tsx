import { PedidoService } from "../../services/PedidoService";
import styles from "../Pedido/Pedido.module.css"
import { useParams } from "react-router-dom";

export const AfterPaymentMP = () => {
    const { state } = useParams();
    console.log(state);
    const pedidoService = new PedidoService();

    const pedidoIdString = localStorage.getItem("pedidoId");
    let pedidoId = 0;
    if(pedidoIdString != null){
        pedidoId = parseInt(pedidoIdString);
    }

    switch (state) {
        case "success":
            // cambiar estado a pagado
            pedidoService.cambiarEstado(pedidoId, "PAGADO")
                .then(response => {
                    console.log("Estado cambiado a PAGADO", response);
                })
                .catch(error => {
                    console.error("Error al cambiar estado a PAGADO", error);
                });
            break;

        case "failure":
            // cambiar estado a cancelado
            pedidoService.cambiarEstado(pedidoId, "CANCELADO")
                .then(response => {
                    console.log("Estado cambiado a CANCELADO", response);
                })
                .catch(error => {
                    console.error("Error al cambiar estado a CANCELADO", error);
                });
            break;

        default:
            break;
    }


    return (
        <div>
            {
                state === "mpsuccess" && (
                    <div className={styles.realizadoDiv}>
                        <h2>Su pedido fue pagado con <p className={styles.exito}>éxito</p></h2>
                    </div>
                )
            }
            {
                state === "mppending" && (
                    <div className={styles.realizadoDiv}>
                        <h2>Su pago está en espera</h2>
                    </div>
                )
            }
            {
                state === "mpfailure" && (
                    <div className={styles.realizadoDiv}>
                        <h2>Error al pagar</h2>
                    </div>
                )
            }
        </div>
    )
}
