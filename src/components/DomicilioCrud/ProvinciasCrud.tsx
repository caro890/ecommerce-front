import { useLoaderData/*, useNavigate*/ } from "react-router";
import { Form } from "react-bootstrap";
import { ProvinciaService } from "../../services/ProvinciaService";
import { Provincia } from "../../types/Domicilio/Provincia";

export const ProvinciasCrud = () => {
  const provincias = useLoaderData() as Provincia[];
  
  return (
    <>
      <div>Provincias Crud</div>



      <Form.Select>
        <option>Elija una provincia</option>
        {provincias.map((provincia) => (
          <option key={provincia.id} value={provincia.id}>
            {provincia.nombre}
          </option>
        ))}
      </Form.Select>
    </>
  )
}


//loader function
export const provinciasLoader = async () => {
  const service: ProvinciaService = new ProvinciaService();
  return service.getAll();
}

export const getProvinciasPorPaisId = async (idPais: number) => {
  const service: ProvinciaService = new ProvinciaService();
  return service.findByPaisId(idPais);
};

