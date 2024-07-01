import { BotonVolver } from "../BotonVolver/BotonVolver"
import styles from "../DetalleMenu/DetalleMenu.module.css"
import { Row, Col, Modal, ModalHeader, ModalTitle, ModalBody, Button, ModalFooter } from "react-bootstrap"
import { GenericGallery } from "../GenericGallery/GenericGallery"
import { useParams } from "react-router-dom"
import { FC, useEffect, useState } from "react"
import { ArticuloManufacturado } from "../../types/Articulos/ArticuloManufacturado"
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService"
import { ArticuloInsumo } from "../../types/Articulos/ArticuloInsumo"
import { ArticuloInsumoService } from "../../services/ArticuloInsumoService"
import formatPrice from "../../types/format/priceFormat"
import { DetallePedido } from "../../types/Pedidos/DetallePedido"
import { useCarrito } from "../../hooks/useCarrito"
import Usuario from "../../types/Usuario"

interface IPropsDetalleMenu {
  service: ArticuloManufacturadoService | ArticuloInsumoService
}

export const DetalleMenu: FC<IPropsDetalleMenu> = ({
  service
}) => {
  const { id } = useParams();
  const carrito = useCarrito();

  const [producto, setProducto] = useState<ArticuloManufacturado | ArticuloInsumo | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cantidad, setCantidad] = useState<number>(1);

  const [jsonUsuario, setJsonUsuario] = useState<any>(localStorage.getItem('usuario'))
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

  useEffect(() => {
    service.getById(Number(id)).then((data) => {
      data != undefined ? setProducto(data) : setProducto(null)
    });
  }, [])

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleAddToCart = () => {
    if (producto) {
      var subTotal = producto?.precioVenta * cantidad;
      //console.log(subTotal)
      var detalle: DetallePedido = {
        id: 0,
        eliminado: false,
        cantidad: cantidad,
        subTotal: subTotal,
        articulo: producto,
        promocion: undefined
      }

      carrito.addItemCart(detalle);
      setShowModal(false);
    }
  }

  const addCantidad = () => {
    var aux: number = cantidad + 1;
    setCantidad(aux);
  };

  const substractCantidad = () => {
    if (cantidad > 1) {
      var aux: number = cantidad - 1;
      setCantidad(aux);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainBox}>
        {
          producto ?
            <div className={styles.mainBox}>
              <div className={styles.header}>
                <p>{producto?.denominacion}</p>
                <BotonVolver />
              </div>
              <div className={styles.body}>
                <Row className={styles.content}>
                  <Col className="mb-4">
                    <GenericGallery imagenes={producto?.imagenes}></GenericGallery>
                  </Col>
                  <Col>
                    {"descripcion" in producto ? producto.descripcion : null}<br />
                    <p className={styles.price}>{formatPrice(producto?.precioVenta)}</p>
                    {
                      (usuarioLogueado) ?
                        <div>
                          <div className={styles.addToCart}>
                            <button type="button" onClick={handleAdd}>+</button>
                          </div>
                        </div>
                        :
                        <div style={{ margin: '10px'}}>
                          Debés iniciar sesión para comprar
                        </div>
                    }





                  </Col>
                </Row>
              </div>
            </div>
            : null
        }
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
          <ModalHeader closeButton>
            <ModalTitle>Añadir {producto?.denominacion} al carrito</ModalTitle>
          </ModalHeader>
          <ModalBody className={styles.modalBody}>
            <p>Elija la cantidad: </p>
            <div className={styles.cantidad}>
              <button type="button" onClick={substractCantidad}>-</button>
              <p>{cantidad}</p>
              <button type="button" onClick={addCantidad}>+</button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="success" onClick={handleAddToCart} >
              Agregar al carrito
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}

export default DetalleMenu;