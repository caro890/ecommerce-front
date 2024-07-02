import styles from "../Menu/Menu.module.css"
import imagen from "../../img/logoBackgroundRemoved.png"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Categoria } from "../../types/Articulos/Categoria"
import { SucursalService } from "../../services/SucursalService"
import { BotonVolver } from "../BotonVolver/BotonVolver"
import { CategoriaService } from "../../services/CategoriaService"

export const Menu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  //const sucursalService = new SucursalService();
  const categoriaService = new CategoriaService();

  useEffect(() => {
    categoriaService.getCategoriasBySucursalId(Number(id)).then((data) => 
      data != undefined ? setCategorias(data) : setCategorias([])
    );
  }, []);

  const handleClickCategoria = (cat: Categoria) => {
    if(cat.subCategorias?.length!=0) {
      navigate(`/subMenu/${cat.id}`)
    } else {
      navigate(`/productos/${cat.id}`);
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <p></p>
        <BotonVolver/>
      </div>
      <div className={styles.menu}>
        { categorias.length != 0 ?
            categorias.map((categoria: Categoria) => (
              <div onClick={() => handleClickCategoria(categoria)} key={categoria.id} className={styles.card}>
                <div className={styles.imgBox} >
                  <img src={imagen} />
                </div>
                {categoria.denominacion}
              </div>
            ))        
          : null
        }
      </div>
    </div>
  )
}

export default Menu;