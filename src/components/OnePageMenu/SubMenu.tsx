import React from "react";
import { Categoria } from "../../types/Articulos/Categoria";
import { CategoriaBanner } from "./CategoriaBanner";
import { ProductosBox } from "./ProductosBox";
import styles from "../OnePageMenu/NewMenu.module.css"

type Props = {
    subCategoria: Categoria[]
}

class SubMenu extends React.PureComponent<Props> {
    constructSubMenu = (subcategoria: Categoria) => {
        if(subcategoria.subCategorias?.length!=0) {
            return (
                <div key={subcategoria.id} className={styles.section}>
                    <CategoriaBanner nombre={subcategoria.denominacion} />
                    {subcategoria.subCategorias?.map(this.constructSubMenu)}
                </div>
            )
        } else {
            return (
                <div key={subcategoria.id} className={styles.section}>
                    <CategoriaBanner nombre={subcategoria.denominacion} />
                    <ProductosBox categoria={subcategoria}/>
                </div>
            );
        }
    }

    render(): React.ReactNode {
        const { subCategoria } = this.props;

        return (
            <>
                {subCategoria.map((cat: Categoria) => this.constructSubMenu(cat))}
            </>
        )
    }
}

export default SubMenu;