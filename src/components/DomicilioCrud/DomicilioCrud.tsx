import { useLoaderData } from "react-router";
import { Form } from "react-bootstrap";
import { DomicilioService } from "../../services/DomicilioService";
import { Domicilio } from "../../types/Domicilio/Domicilio";

export const DomicilioCrud = () => {
  const domicilios = useLoaderData() as Domicilio[];


  return (
    <>
      <div>Domicilios Crud</div>



      <Form.Select>
        <option>Elija un domicilio</option>
        {domicilios.map((domicilio) => (
          <option key={domicilio.id} value={domicilio.id}>
            {domicilio.calle}
          </option>
        ))}
      </Form.Select>
    </>
  )
}


//loader function
export const domicilioLoader = async () => {
  const service: DomicilioService = new DomicilioService();
  return service.getAll();
}

export const createDomicilio = async(domicilio: Domicilio) =>{
    const service: DomicilioService = new DomicilioService();
    return service.post(domicilio);
}
