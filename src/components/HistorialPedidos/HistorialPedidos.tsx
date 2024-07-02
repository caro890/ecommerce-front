import { useEffect, useState } from 'react'
import '../css/historialpedidos.css'
import { PedidoService } from '../../services/PedidoService';
import { Pedido } from '../../types/Pedidos/Pedido';
import HistorialPedidosContent from '../HistorialPedidosContent/HistorialPedidosContent';
import Usuario from '../../types/Usuario';

const HistorialPedidos = () => {
    const [pedidosByUserId, setPedidosByUserId] = useState<Pedido[]>([]);
    const service = new PedidoService();

    const [jsonUsuario, setJsonUsuario] = useState<any>(localStorage.getItem('usuario'))
    const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;


    useEffect(() => {
        const obtenerPedidosByUserId = async (id: number, email: string) => {
            try {
                const pedidosObtenidosByUserId = await service.getByUserId(id, email);
                setPedidosByUserId(pedidosObtenidosByUserId);
                console.log("obteniendo pedidos por user id");



            } catch (error) {
                console.error('Error al obtener los pedidos por user id:', error);
            }
        }



        obtenerPedidosByUserId(usuarioLogueado?.id, usuarioLogueado?.email);



        // Configurar el intervalo para llamar a obtenerPedidos cada 15 minutos
        const intervalId = setInterval(() => {
            obtenerPedidosByUserId(usuarioLogueado?.id, usuarioLogueado?.email);
        }, 15 * 60 * 1000); // 15 minutos en milisegundos

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);

    }, []);

    return (
        <>

            <div style={{ textAlign: 'center', margin: '30px' }}>
                <h1>Historial de pedidos</h1>
            </div>





            {

                usuarioLogueado ?
                    <>

                        <div className='header-historialpedidos' style={{ textAlign: 'center' }}>
                            {/* <h4>Id</h4> */}
                            <h4>Estado</h4>
                            <h4>Fecha</h4>
                            <h4>Hora <br /> Estimada</h4>
                            <h4>Factura</h4>
                        </div>
                        {pedidosByUserId.length != 0 ?
                            pedidosByUserId.map((pedido: Pedido) => 
                                <HistorialPedidosContent key={pedido.id} estado={pedido.estadoPedido.toString()} id={pedido.id} fechaPedido={pedido.fechaPedido.toString()} horaEstimadaFinalizacion={pedido.horaEstimadaFinalizacion} />
                            )
                            :
                            <div style={{ textAlign: 'center' }}>
                                <p>No tiene pedidos registrados.</p>
                            </div>
                        }
                    </>
                    :
                    <div style={{ textAlign: 'center', margin: '10px' }}>
                        <p>Debes estar logueado para ver el contenido de esta pantalla</p>
                    </div>

            }


        </>
    )
}

export default HistorialPedidos