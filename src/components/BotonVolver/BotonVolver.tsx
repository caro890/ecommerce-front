import { useNavigate } from "react-router-dom"
import styles from "../BotonVolver/BotonVolver.module.css"

export const BotonVolver = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.btn} onClick={() => navigate(-1)} >
      VOLVER
    </button>
  )
}
