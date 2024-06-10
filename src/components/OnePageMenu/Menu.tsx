import { LoaderFunction, useLoaderData } from "react-router-dom";
import { SucursalService } from "../../services/SucursalService";
import { Categoria } from "../../types/Articulos/Categoria";
import { CategoriaBanner } from "./CategoriaBanner";
import { ProductosBox } from "./ProductosBox";
import SubMenu from "./SubMenu";
import styles from "../OnePageMenu/NewMenu.module.css"
import { BotonVolver } from "../BotonVolver/BotonVolver";
import { Form } from "react-bootstrap";
import { useState } from "react";

export const Menu = () => {
  const categorias: Categoria[] = useLoaderData() as Categoria[];
  const [filteredData, setFilteredData] = useState<Categoria[]>(categorias);

  const handleFiltrar = async (e: {target: { value: any }}) => {
    const { value } = e.target;
    if(Number(value)!=0) {
      let auxArray: Categoria[] = [];
      
      let aux: Categoria | undefined = categorias.find((cat: Categoria) => 
        {return cat.id == value;}
      );

      if(aux) {
        auxArray.push(aux);
      }
      
      setFilteredData(auxArray);
    } else {
      setFilteredData(categorias);
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div>Menú</div>
        <div>
          <Form.Select size="lg" id="filtrar" onChange={handleFiltrar}>
            <option value="0">Filtrar por categoria</option>
            {
              categorias.map((cat: Categoria) => 
                <option key={cat.id} value={cat.id}>{cat.denominacion}</option>
              )
            }
          </Form.Select>
        </div>
        <BotonVolver />
      </div>
      {
        filteredData.length!=0 ?
          filteredData.map((categoria: Categoria, i: number) =>
            <div className={styles.section} key={i}>
              <CategoriaBanner nombre={categoria.denominacion} />
                {
                  categoria.subCategorias?.length!=0 ?
                    categoria.subCategorias &&
                    <SubMenu key={i} subCategoria={categoria.subCategorias}/>
                  :
                  <ProductosBox categoria={categoria}/>
                }
              </div>
            )
        :
        <div>No hay categorías</div>
      }
    </div>
  )
}

export default Menu;

type ReferralParams = {
  id?: string;
}

export const menuLoader: LoaderFunction = async ({params}) => {
  const { id } = params as ReferralParams;
  const service = new SucursalService();

  if(id) {
    return await service.getCategoriasBySucursalId(Number(id));
  } else {
    return [];
  }
}
