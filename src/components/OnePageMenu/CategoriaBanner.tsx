import { FC } from "react"
import styles from "../OnePageMenu/NewMenu.module.css"

interface IPropsCategoriaBanner {
    nombre: string
}

export const CategoriaBanner : FC<IPropsCategoriaBanner> = ({
    nombre
}) => {
  return (
    <div className={styles.title}>
        {nombre}
    </div>
  )
}
