import { useLoaderData/*, useNavigate*/ } from "react-router";
import { Form } from "react-bootstrap";
import { PaisService } from "../../services/PaisService";
import { Pais } from "../../types/Domicilio/Pais";

export const PaisesCrud = () => {
  const paises = useLoaderData() as Pais[];
  
  return (
    <>
      <div>Paises Crud</div>



      <Form.Select>
        <option>Elija un pais</option>
        {paises.map((pais) => (
          <option key={pais.id} value={pais.id}>
            {pais.nombre}
          </option>
        ))}
      </Form.Select>
    </>
  )
}


//loader function
export const paisesLoader = async () => {
  const service: PaisService = new PaisService();
  return service.getAll();
}
