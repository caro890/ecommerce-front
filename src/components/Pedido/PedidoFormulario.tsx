import { useEffect, useState } from "react";
import styles from "../Pedido/Pedido.module.css"
import { useCarrito } from "../../hooks/useCarrito";
import Swal from "sweetalert2";
import { Form, LoaderFunction, useLoaderData } from "react-router-dom";
import { Cliente } from "../../types/Personas/Cliente";
import { Domicilio } from "../../types/Domicilio/Domicilio";
import { formatDomicilio } from "../../types/format/formatDomicilio";
//import { ClienteService } from "../../services/ClienteService";
import { PedidoService } from "../../services/PedidoService";
import { Pedido, PedidoPost } from "../../types/Pedidos/Pedido";
import { getSucursal } from "../Header/Header";
import { CheckoutMP } from "../MercadoPago/CheckoutMP";
import { PreferenceMP } from "../../types/MercadoPago/PreferenceMP";
import { DetallePedido, DetallePedidoPost } from "../../types/Pedidos/DetallePedido";
//import { Sucursal } from "../../types/Empresa/Sucursal";
import { SucursalService } from "../../services/SucursalService";
import { ClienteService } from "../../services/ClienteService";
import Usuario from "../../types/Usuario";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { DomicilioForm } from "./DomicilioForm";
import { DomicilioService } from "../../services/DomicilioService";
import { Articulo } from "../../types/Articulos/Articulo";
import { PromoDetalles } from "../../types/Promos/PromoDetalles";
import { Wallet } from "@mercadopago/sdk-react";




// const domicilio: Domicilio = {
//     "id": 3,
//     "eliminado": false,
//     "calle": "Cangallo",
//     "numero": 800,
//     "piso": 0,
//     "cp": 5519,
//     "nroDpto": 1,
//     "localidad": {
//         "id": 1,
//         "eliminado": false,
//         "nombre": "Luján de Cuyo",
//         "provincia": {
//             "id": 1,
//             "eliminado": false,
//             "nombre": "Mendoza",
//             "pais": {
//                 "id": 1,
//                 "eliminado": false,
//                 "nombre": "Argentina"
//             }
//         }
//     }
// }






export const PedidoFormulario = () => {
    const carrito = useCarrito();
    const cliente = useLoaderData() as Cliente;
    const service = new PedidoService();

    const [envio, setEnvio] = useState<boolean>(false);
    const [realizado, setRealizado] = useState<boolean>(false);
    const [mercadoPagoID, setMercadoPagoID] = useState<PreferenceMP>();
    const [newPedido, setNewPedido] = useState<Pedido | undefined>();

    const [domicilioSucursal, setDomicilioSucursal] = useState<Domicilio | undefined>();

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleAgregarDomicilio = () => {
        setShowModal(true);
    };


    const [section, setSection] = useState(1);
    const [formData, setFormData] = useState({
        address: '',
        pickup: false,
        paymentMethod: ''
    });

    useEffect(() => {
        async function getDomicilio() {
            const domicilioService = new DomicilioService();
            var domicilio = await domicilioService.getBySucursalId(Number(getSucursal()));
            
            setDomicilioSucursal(domicilio);
        }
    
        getDomicilio();
    }, []); 

    const handleNextSection = () => {
        if (section === 2 && (!formData.address)) {
            Swal.fire({
                text: 'Por favor completa todos los campos antes de continuar.',
                icon: "warning"
            });
            return;
        }

        if (section === 1 && envio === true) {
            setSection(section + 2);
        } else {
            setSection(section + 1);
        }

        // console.log(formData.pickup)
    };

    const handlePrevSection = () => {
        if (section === 3 && envio === true) {
            setSection(section - 2);
        } else {
            setSection(section - 1);
        }
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangeEnvio = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
        if (value == "true")
            setEnvio(true);
        else
            setEnvio(false);
    };

    //agregar domicilio

    const closeModal = () => {
        setShowModal(false);
    }

    // const DomicilioForm: React.FC = () => {
    //     const [formAgregarDomicilioData, setFormAgregarDomicilioData] = useState({
    //         calle: '',
    //         cp: '',
    //         nrodpto: '',
    //         numero: '',
    //         piso: '',
    //         localidad: '',
    //         provincia: '',
    //         pais: ''
    //     });

    //     const handleAgregarDomicilioChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //         const { name, value } = event.target;
    //         setFormAgregarDomicilioData({
    //             ...formAgregarDomicilioData,
    //             [name]: value
    //         });
    //     };

    //     const handleAgregarDomicilioSubmit = () => { };


    //formulario pedido
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!formData.paymentMethod) {
            Swal.fire({
                text: 'Por favor completa todos los campos antes de continuar.',
                icon: "warning"
            });
            return;
        }

        //Generar el pedido

        var newTipoEnvio: string;
        if (formData.pickup) { newTipoEnvio = "TAKE_AWAY"; }
        else { newTipoEnvio = "DELIVERY"; }

        var newFormaPago: string;

        if (formData.paymentMethod == "cash") { newFormaPago = "EFECTIVO" }
        else { newFormaPago = "MERCADO_PAGO" }

        var domicilioSelected = null;
        cliente.domicilios.some((dom: Domicilio) => {
            domicilioSelected = dom; return dom.id = Number(formData.address);
        })


        var detalles: DetallePedidoPost[] = [];


        carrito.cart.forEach((d: DetallePedido) => {
            // console.log(JSON.stringify(d));
            if (d.articulo != null) {
                detalles.push({ cantidad: d.cantidad, idArticulo: d.articulo.id, idPromocion: undefined })
            } else if (d.promocion?.promocionDetalles) {
                detalles.push({ cantidad: d.cantidad, idArticulo: undefined, idPromocion: d.promocion.id })
            }
        }
        );

        // console.log(JSON.stringify(detalles));

        if (newTipoEnvio === "DELIVERY" && domicilioSelected != null) {
            var newPedido: PedidoPost = {
                estadoPedido: "PENDIENTE_PAGO",
                tipoEnvio: newTipoEnvio,
                formaPago: newFormaPago,
                domicilio: domicilioSelected,
                idSucursal: Number(getSucursal()),
                idCliente: cliente.id,
                detallePedidos: detalles
            }
            // console.log(domicilioSelected as Domicilio);
        } else {
            // console.log("Retiro" + domicilioSucursal);
            var newPedido: PedidoPost = {
                estadoPedido: "PENDIENTE_PAGO",
                tipoEnvio: newTipoEnvio,
                formaPago: newFormaPago,
                domicilio: domicilioSucursal,
                idSucursal: Number(getSucursal()),
                idCliente: cliente.id,
                detallePedidos: detalles
            }
            // console.log(domicilioSucursal?.id);
        }



        console.log(JSON.stringify(newPedido));
        var aux: Pedido | undefined = await service.create(newPedido);

        if (aux != undefined) {
            setNewPedido(aux);

            localStorage.setItem("pedidoId", String(aux.id));
            console.log("aux: "+aux);
            if (formData.paymentMethod === "mercadoPago") {
                var mpId = await service.getPreferenceMP(aux);
                setMercadoPagoID(mpId);
                setSection(4);
            } else {
                setSection(0);
                setRealizado(true);
            }
        } else {
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error",
                icon: "error"
            })
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={`${styles.contenedor} container w-100`}>
                {section === 2 && envio == false && (
                    <div>
                        <h2>Seleccione el domicilio para la entrega</h2>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Domicilio</label>
                            <select
                                id="address"
                                name="address"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option value="" label="Seleccione domicilio" />
                                {cliente.domicilios.map((domicilio: Domicilio, index: number) =>
                                    <option key={index} value={domicilio.id} label={formatDomicilio(domicilio)} />
                                )}
                            </select>
                            <button type="button" className="btn btn-primary" onClick={handleAgregarDomicilio}>Agregar domicilio</button>
                        </div>


                        <Modal centered show={showModal} onHide={closeModal}>
                            <ModalHeader closeButton>
                                <ModalTitle>Agregar nuevo domicilio</ModalTitle>
                            </ModalHeader>
                            <ModalBody >
                                <DomicilioForm closeModal={closeModal} />


                            </ModalBody>
                        </Modal>




                    </div>
                )}

                {section === 1 && (
                    <div>
                        <h2>Método de Entrega</h2>
                        <div className={styles.radioDiv + " mb-3"}>
                            <input
                                id="pickup"
                                name="pickup"
                                type="radio"
                                radioGroup="envio"
                                className="form-check-input"
                                value="true"
                                checked={envio}
                                onChange={handleChangeEnvio}
                            />
                            <label htmlFor="pickup" className="form-check-label">Retirar en el local</label>
                        </div>
                        <div className={styles.radioDiv + " mb-3"}>
                            <input
                                id="delivery"
                                name="pickup"
                                type="radio"
                                radioGroup="envio"
                                className="form-check-input"
                                value="false"
                                checked={!envio}
                                onChange={handleChangeEnvio}
                            />
                            <label htmlFor="delivery" className="form-check-label">Entrega a domicilio</label>
                        </div>
                    </div>
                )}

                {section === 3 && (
                    <div>
                        <h2>Método de Pago</h2>
                        <div className="mb-3">
                            <label htmlFor="paymentMethod" className="form-label">Forma de Pago</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                className="form-select"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                            >
                                <option value="" label="Seleccione método de pago" />
                                {envio ?
                                    <><option value="cash" label="Efectivo (10% de descuento)" />
                                        <option value="mercadoPago" label="MercadoPago" /></>
                                    :
                                    <option value="mercadoPago" label="MercadoPago" />
                                }
                            </select>
                        </div>
                    </div>
                )}

                {section === 4 && mercadoPagoID != undefined && (
                    <div>
                        <CheckoutMP preferencedId={mercadoPagoID} />
                    </div>
                )}

                <div className={styles.btnDiv + " mb-3"}>
                    {section > 1 && section != 4 && (
                        <button type="button" className="btn btn-primary" onClick={handlePrevSection}>Volver</button>
                    )}
                    {section < 3 && section != 0 && (
                        <button type="button" className="btn btn-primary" onClick={handleNextSection}>Continuar</button>
                    )}
                    {section === 3 && (
                        <button type="submit" className="btn btn-primary">Finalizar Pago</button>
                    )}
                </div>
            </form>
            {realizado &&
                <div className={styles.realizadoDiv}>
                    <h2>Su pedido fue realizado con <p className={styles.exito}>éxito</p></h2>
                    {/* envio ?
                        <p>Tiempo estimado para retirar: {newPedido?.horaEstimadaFinalizacion}</p>
                        :
                        <p>Tiempo estimado del delivery: {newPedido?.horaEstimadaFinalizacion}</p>
                    */}
                </div>
            }
        </div>
    )
}

export const clienteLoader: LoaderFunction = async ({ params, request }) => {
    const idUsuario = parseInt(params.idUsuario as string, 10);


    const service = new ClienteService();
    var res = await service.getByUserId(idUsuario);

    // console.log(res);

    // var res: Cliente = {
    //     id: 1,
    //     eliminado: false,
    //     nombre: "Sebastian",
    //     apellido: "Wilder",
    //     telefono: "2615920825",
    //     fechaNacimiento: new Date(),
    //     domicilios: [
    //         {
    //             id: 3,
    //             eliminado: false,
    //             calle: "Cangallo",
    //             numero: 800,
    //             piso: 0,
    //             cp: 5519,
    //             nroDpto: 1,
    //             localidad: {
    //                 id: 1,
    //                 eliminado: false,
    //                 nombre: "Luján de Cuyo",
    //                 provincia: {
    //                     id: 1,
    //                     eliminado: false,
    //                     nombre: "Mendoza",
    //                     pais: {
    //                         id: 1,
    //                         eliminado: false,
    //                         nombre: "Argentina"
    //                     }
    //                 }
    //             }
    //         }
    //     ]
    // }

    return res;
}