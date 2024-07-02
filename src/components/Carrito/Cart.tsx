import { Button, Col, Row } from "react-bootstrap"
import { BotonVolver } from "../BotonVolver/BotonVolver"
import styles from "../Carrito/Cart.module.css"
import { useCarrito } from "../../hooks/useCarrito"
import { DetallePedido } from "../../types/Pedidos/DetallePedido"
import { useNavigate } from "react-router-dom"
import formatPrice from "../../types/format/priceFormat"
import { calcularTotal } from "../../types/Pedidos/Pedido"
import { useState } from "react"
import Usuario from "../../types/Usuario"

export const Carrito = () => {
  const carrito = useCarrito();
  const navigate = useNavigate();


  const [jsonUsuario, setJsonUsuario] = useState<any>(localStorage.getItem('usuario'))
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;


  console.log(carrito);
  return (
    <>

      {

        usuarioLogueado ?
          <>

            < div className={styles.container} >
              <div className={styles.mainBox}>
                <div className={styles.header}>
                  <p>Mi Carrito</p>
                  <BotonVolver />
                </div>
                {
                  carrito.cart.length != 0 ?
                    <div className={styles.table}>
                      <Row>
                        <Col className={styles.tdata}>
                          <p>CÓDIGO</p>
                        </Col>
                        <Col className={styles.tdata}>
                          <p>ARTICULO</p>
                        </Col>
                        <Col className={styles.tdata}>
                          <p>CANTIDAD</p>
                        </Col>
                        <Col className={styles.tdata}>
                          <p>SUBTOTAL</p>
                        </Col>
                        <Col className={styles.tdata}>
                          <p>REMOVER</p>
                        </Col>
                        <hr />
                      </Row>
                      {
                        carrito.cart.map((detalle: DetallePedido, index: number) =>
                          // detalle.articulo ?
                            <Row key={index}>
                              <Col>
                                {detalle.articulo ? detalle.articulo.codigo : ""}
                              </Col>
                              <Col>
                                {detalle.articulo ? detalle.articulo.denominacion : "Promo " + detalle.promocion?.denominacion}
                              </Col>
                              <Col>
                                {detalle.cantidad}
                              </Col>
                              <Col>
                                {formatPrice(detalle.subTotal)}
                              </Col>
                              <Col>
                                <Button className="mb-3" variant="danger" onClick={() => carrito.removeItemCart(detalle)}>
                                  Quitar del carrito
                                </Button>
                              </Col>
                              <hr />
                            </Row>

                            // :
                            // detalle.promocion?.promocionDetalles.map((articulo: Articulo, index: number) =>
                            //   <Row key={index}>
                            //     <Col>
                            //       {articulo.codigo}
                            //     </Col>
                            //     <Col>
                            //       {articulo.denominacion}
                            //     </Col>
                            //     <Col>
                            //       {detalle.cantidad}
                            //     </Col>
                            //     <Col>
                            //       {formatPrice(detalle)}
                            //     </Col>
                            //     <Col>
                            //       <Button className="mb-3" variant="danger" onClick={() => carrito.removeItemCart(detalle)}>
                            //         Quitar del carrito
                            //       </Button>
                            //     </Col>
                            //     <hr />
                            //   </Row>
                            // )

                        )
                      }
                      <Row className={styles.row}>
                        <Col>
                          <p className={styles.total}>TOTAL: {formatPrice(calcularTotal(carrito.cart))}</p>
                        </Col>
                        <Col>
                          <Button className="mb-4" variant="success" onClick={() => navigate("/pedido/" + usuarioLogueado?.id)}>
                            COMPRAR
                          </Button>
                        </Col>
                      </Row>
                    </div>
                    :
                    <div className={styles.vacio}>
                      <p>No hay productos en el carrito</p>
                    </div>
                }
              </div>
            </div >

          </>
          :
          <div style={{ textAlign: 'center', margin: '10px' }}>
            <p>Debes estar logueado para ver el contenido de esta pantalla</p>
          </div>
      }
    </>
  )
}
