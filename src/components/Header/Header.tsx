import { Link, useNavigate } from "react-router-dom"
import styles from "../Header/Header.module.css"
import logo from "../../img/logoNoName.png"
import { useCarrito } from "../../hooks/useCarrito";
import { useState } from "react";
import { Roles } from "../../types/Roles";
import Usuario from "../../types/Usuario";
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
/*import { Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Sucursal } from "../../types/Empresa/Sucursal"
import { SucursalService } from "../../services/SucursalService"*/

export const getEmpresa = () => {
  return localStorage.getItem("empresaId");
}

export const getSucursal = () => {
  return localStorage.getItem("sucursalId");
}

export const Header = () => {
  const [jsonUsuario, setJsonUsuario] = useState<any>(localStorage.getItem('usuario'))
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

  const cerrarSesion = async () => {
    localStorage.setItem('usuario', "");
    localStorage.removeItem('usuario');
    navigate('/login', {
      replace: true,
      state: {
        logged: false
      },
    });
    window.location.reload();
  }


  const carrito = useCarrito();
  const navigate = useNavigate();
  //const [sucursales, setSucursales] = useState<Sucursal[]>();
  //const service = new SucursalService();

  /*useEffect(() => {
    var idEmpresa: number = Number(getEmpresa());

    service.getByEmpresaId(Number(idEmpresa)).then((data) => {
      data != undefined ? setSucursales(data) : setSucursales([])
    });

    console.log(sucursales);
  }, [localStorage.getItem("empresaId")]);*/

  /*const handleSelected = (value: string) => {
    localStorage.setItem("sucursalId", value);
  }*/

  const handleBrandClick = () => {
    localStorage.removeItem("empresaId");
    localStorage.removeItem("sucursalId");
    carrito.cleanCart();
    navigate("/");
  }


  // menu

  const [menuActive, setmenuActive] = useState(false);

  const handleMenuClick = () => {
    setmenuActive(!menuActive);
  };

  return (
    <div className={styles.header}>
      <div className={styles.brand} >
        <div className={styles.brandContent} onClick={handleBrandClick}>
          <img className={styles.logo} src={logo} />
          <h4 className={styles.title}>
            El Buen Sabor
          </h4>
        </div>

        <div className={styles.menuHamburguesa} onClick={handleMenuClick}>
          <CIcon icon={cilHamburgerMenu} />
        </div>
      </div>
      {/*getEmpresa() != null ?
          <div className={styles.selectBox}>
            <Form.Select onChange={(e) => handleSelected(e.target.value)}>
              <option value="0">Sucursal</option>
              {
                sucursales?.map((sucursal: Sucursal) => (
                  <option key={sucursal.id} value={sucursal.id}>
                    {sucursal.nombre}
                  </option>
                ))
              }
            </Form.Select>
          </div>
          : null
            */}
      {getSucursal() ?
        <div className={`${styles.menu} ${menuActive ? styles.menuActivo : styles.menuInactivo}`}>
          <Link className={styles.menuItem} to={`menu/${getSucursal()}`}>Menu</Link>
          <Link className={styles.menuItem} to={`promos/${getSucursal()}`}>Promociones</Link>
          <Link className={styles.menuItem} to="carrito">Carrito</Link>

          {usuarioLogueado ?
            <>
              <Link className={styles.menuItem} to="historialPedidos">Pedidos</Link>
            </>
            :
            null
          }

        </div>
        : null
      }

      <div id='header_right' className={`${styles.menu} ${menuActive ? styles.menuActivo : styles.menuInactivo}`}>
        {
          usuarioLogueado ?
            <div id='login_section' className={styles.loginSection}>
              <div id='user_div'>
                Usuario:
                {usuarioLogueado?.email} - {usuarioLogueado?.rol == Roles.ADMIN ? "Admin" : "Cliente"}
              </div>
              <button onClick={cerrarSesion} className="btn btn-danger" type="button">
                Cerrar Sesión
              </button>
            </div>
            :

            <div>
              <button onClick={() => navigate('/login')} className="btn btn-success" type="button">
                Iniciar sesión
              </button>
            </div>
        }
      </div>


    </div >
  )
}
