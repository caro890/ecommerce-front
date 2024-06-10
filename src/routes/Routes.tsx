import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { RootLayout } from "./layouts/RootLayout";
import { Carrito } from "../components/Carrito/Cart";
import { Empresas } from "../components/Empresas/Empresas";
import { ArticuloManufacturadoService } from "../services/ArticuloManufacturadoService";
import { ArticuloInsumoService } from "../services/ArticuloInsumoService";
import { Suspense, lazy } from "react";
import { Loader } from "../components/Loader/Loader";
import { PedidoFormulario, clienteLoader } from "../components/Pedido/PedidoFormulario";
//import { menuProductosLoader } from "../components/MenuProductos/MenuProductos";
//import SubMenu from "../components/SubMenu/SubMenu";
import { PageNotFound } from "../components/PageNotFound/PageNotFound";
import { AfterPaymentMP } from "../components/MercadoPago/AfterPaymentMP";
import { menuLoader } from "../components/OnePageMenu/Menu";

const Sucursales = lazy(() => import("../components/Sucursales/Sucursales"));
//const Menu = lazy(() => import("../components/Menu/Menu"));
const Menu = lazy(() => import("../components/OnePageMenu/Menu"));
//const MenuProductos = lazy(() => import("../components/MenuProductos/MenuProductos"));
const DetalleMenu = lazy(() => import("../components/DetalleMenu/DetalleMenu"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Empresas />} />
            <Route path="sucursales/:id?" element={<Sucursales />} />

            {/*<Route path="menu/:id?" element={<Menu/>}/>
            <Route path="subMenu/:id" element={<SubMenu/>}/>
            <Route path="productos/:id?" element={<MenuProductos />} loader={menuProductosLoader} />*/}

            <Route path="menu/:id" element={<Menu/>} loader={menuLoader} />

            <Route path="detalle/:id?" element={<DetalleMenu service={new ArticuloManufacturadoService()} />} />
            <Route path="detalle/otro/:id?" element={<DetalleMenu service={new ArticuloInsumoService()}/>} />
            
            <Route path="carrito" element={<Carrito/>} />
            <Route path="pedido" element={<PedidoFormulario/>} loader={clienteLoader} />
            <Route path="*" element={<PageNotFound/>} />

            <Route path="mp/:state" element={<AfterPaymentMP/>}/>
        </Route>
        
    )
);

export const AppRoutes = () => {
    return (
        <>
        <Suspense fallback={<Loader/>}>
            <RouterProvider router={router}>
            </RouterProvider>
        </Suspense>
        </>
    )
}