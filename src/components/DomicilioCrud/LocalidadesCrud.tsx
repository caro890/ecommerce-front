import { useLoaderData } from "react-router";
import { Form } from "react-bootstrap";
import { LocalidadService } from "../../services/LocalidadService";
import { Localidad } from "../../types/Domicilio/Localidad";

export const LocalidadesCrud = () => {
  const localidades = useLoaderData() as Localidad[];
  

  return (
    <>
      <div>Localidades Crud</div>



      <Form.Select>
        <option>Elija una localidad</option>
        {localidades.map((localidad) => (
          <option key={localidad.id} value={localidad.id}>
            {localidad.nombre}
          </option>
        ))}
      </Form.Select>
    </>
  )
}


//loader function
export const localidadesLoader = async () => {
  const service: LocalidadService = new LocalidadService();
  return service.getAll();
}

export const getLocalidadesPorProvinciaId = async (idProvincia: number) => {
  const service: LocalidadService = new LocalidadService();
  return service.findByProvinciaId(idProvincia);
};

