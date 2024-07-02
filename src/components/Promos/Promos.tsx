import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PromosService } from "../../services/PromosService";
import { Promo } from "../../types/Promos/Promo";
import { BotonVolver } from "../BotonVolver/BotonVolver";
import styles from "../Menu/Menu.module.css"

export const Promos = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [promociones, setPromociones] = useState<Promo[]>([]);

    const promosService = new PromosService();

    useEffect(() => {
        promosService.getHabilitadosBySucursalId(Number(id)).then((data) =>
            data != undefined ? setPromociones(data) : setPromociones([])
        );
    }, []);

    const handleClickPromo = (promo: Promo) => {
        //llevar a pagina detalle promo

        navigate(`/promosDetalle/${promo.id}`)

        
    }

    return (
        <div>
            <div className={styles.header}>
                <p></p>
                <BotonVolver />
            </div>
            <div className={styles.menu}>
                {promociones.length != 0 ?
                    promociones.map((promo: Promo) => (
                        <div onClick={() => handleClickPromo(promo)} key={promo.id} className={styles.card}>
                            <div className={styles.imgBox} >
                                {/* {promo.imagenes ? [0] ?
                                    <img src={promo.imagenes[0].url} />
                                } */}
                            </div>
                            {promo.denominacion}
                        </div>
                    ))
                    : 
                    <div style={{ textAlign: 'center' }}>
                        <p>No hay promociones disponibles.</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Promos;