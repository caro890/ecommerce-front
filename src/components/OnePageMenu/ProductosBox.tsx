import { FC, useEffect, useState } from "react"
import { Categoria } from "../../types/Articulos/Categoria"
import { ArticuloInsumo } from "../../types/Articulos/ArticuloInsumo"
import { ArticuloManufacturado } from "../../types/Articulos/ArticuloManufacturado"
import { ArticuloInsumoService } from "../../services/ArticuloInsumoService"
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService"
import { getSucursal } from "../Header/Header"
import { Link } from "react-router-dom"
import styles from "../OnePageMenu/NewMenu.module.css"

interface IPropsProductosBox {
    categoria: Categoria
}

export const ProductosBox : FC<IPropsProductosBox> = ({
    categoria
}) => {
  const [productos, setProductos] = useState<ArticuloManufacturado[]>([]);
  const [otros, setOtros] = useState<ArticuloInsumo[]>([]);

  const insumoService = new ArticuloInsumoService();
  const service = new ArticuloManufacturadoService();
  
  const idSucursal = getSucursal();
  
  useEffect(() => {
    if (categoria.esInsumo) {
      insumoService.getByCategoria(String(categoria?.denominacion), Number(idSucursal)).then((data) => {
        data != undefined ? setOtros(data) : setOtros([])
      });
    } else {
      service.getByCategoria(String(categoria?.denominacion), Number(idSucursal)).then((data) => (
        data != undefined ? setProductos(data) : setProductos([])
      ));
    }
  }, [categoria]);

  return (
    <div className={styles.productosBox}>
        {
            productos.length!=0 &&
                productos.map((producto: ArticuloManufacturado) => 
                    <Link key={producto.id} to={`/detalle/${producto.id}`} className={styles.card}>
                        <div className={styles.imgBox}>
                            <img src={producto.imagenes? producto.imagenes[0].url:""} />
                        </div>
                        {producto.denominacion}
                    </Link>
                )
        }
        {
            otros.length!=0 &&
                otros.map((otro: ArticuloInsumo) =>
                    <Link key={otro.id} to={`/detalle/otro/${otro.id}`} className={styles.card}>
                        <div className={styles.imgBox}>
                            <img src={otro.imagenes? otro.imagenes[0].url: ""} />
                        </div>
                        {otro.denominacion}
                    </Link>
                )
        }
    </div>
  )
}
