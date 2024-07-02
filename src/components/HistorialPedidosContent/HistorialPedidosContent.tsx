import './HistorialPedidosContent.css';
import { cilArrowCircleBottom } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { base } from '../../services/BackendClient';

const HistorialPedidosContent = ({ estado = '', id = 0, fechaPedido = '', horaEstimadaFinalizacion = '' }) => {

  const descargarFactura = (id: number) => {
    window.open(base+"facturas/facturaPdf/" + id, "_blank");
  }

  return (
    <>

      <div className="content_div">
        <div className="detalles_div" id="grilla_container">
          {/* <p>{id}</p> */}
          <p>{estado}</p>
          <p>{fechaPedido}</p>
          <p>{horaEstimadaFinalizacion}</p>
          <a onClick={() => descargarFactura(id)}><CIcon icon={cilArrowCircleBottom} className="icon" /></a>
          

        </div>
      </div>

    </>
  );
};

export default HistorialPedidosContent;
