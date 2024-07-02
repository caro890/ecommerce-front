import { Container } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistroService from '../../services/RegistroService';
import UsuarioClienteJSON from '../../types/UsuarioClienteJSON';

const Registrarse = () => {
    const navigate = useNavigate();
    const [usuarioCliente, setUsuarioCliente] = useState<UsuarioClienteJSON>(new UsuarioClienteJSON());
    const [txtValidacion, setTxtValidacion] = useState<string>("");


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsuarioCliente({
          ...usuarioCliente,
          usuarioCliente: {
            ...usuarioCliente.usuarioCliente!,
            email: e.target.value
          }
        });
      };
    
      const handleClaveEncriptadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsuarioCliente({
          ...usuarioCliente,
          usuarioCliente: {
            ...usuarioCliente.usuarioCliente!,
            claveEncriptada: e.target.value
          }
        });
      };

    const registrarse = async () => {

        //pasos para registrarse
        console.log(usuarioCliente);

        if (usuarioCliente?.usuarioCliente?.email == undefined || usuarioCliente?.usuarioCliente?.email === "") {
            setTxtValidacion("Ingrese el nombre de usuario");
            return;
        }
        if (usuarioCliente?.usuarioCliente?.claveEncriptada == undefined || usuarioCliente?.usuarioCliente?.claveEncriptada === "") {
            setTxtValidacion("Ingrese la clave");
            return;
        }

        if (usuarioCliente?.nombre == undefined || usuarioCliente?.nombre === "") {
            setTxtValidacion("Ingrese el nombre");
            return;
        }

        if (usuarioCliente?.apellido == undefined || usuarioCliente?.apellido === "") {
            setTxtValidacion("Ingrese el apellido");
            return;
        }

        if (usuarioCliente?.fechaNacimiento == undefined) {
            setTxtValidacion("Ingrese la fecha de nacimiento");
            return;
        }

        if (usuarioCliente?.telefono == undefined || usuarioCliente?.telefono === "") {
            setTxtValidacion("Ingrese el teléfono");
            return;
        }

        console.log(JSON.stringify(usuarioCliente));
        //hacer la llamada al endpoint para registrarse
        //hay que registrar usuariocliente

        RegistroService.addUsuarioCliente(usuarioCliente)
            .then(usuarioCreado => {
                console.log('Usuario creado:', usuarioCreado);
                alert("Usuario creado exitosamente!");
                navigate('/login');
            })
            .catch(error => {
                console.error('Error al crear el usuario:', error);
                setTxtValidacion("Hubo un error al crear el usuario.");
            });


    }

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <div className="border p-4 bg-light shadow-sm rounded" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center mb-4">Registrarse</h2>
                    <Form style={{ display: 'flex', flexDirection: 'column' }}>
                        <Form.Group controlId="usuario">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={usuarioCliente.usuarioCliente?.email}
                                onChange={handleEmailChange}
                                placeholder="Ingresa un nombre de usuario"
                            />
                        </Form.Group>
                        <Form.Group controlId="contraseña" className="mt-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                defaultValue={usuarioCliente.usuarioCliente?.claveEncriptada}
                                onChange={handleClaveEncriptadaChange}
                                placeholder="Ingresa una contraseña"
                            />
                        </Form.Group>
                        <Form.Group controlId="nombre" className="mt-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={usuarioCliente.nombre}
                                onChange={e => usuarioCliente.nombre = String(e.target.value)}
                                placeholder="Ingresa tu nombre"
                            />
                        </Form.Group>
                        <Form.Group controlId="apellido" className="mt-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={usuarioCliente.apellido}
                                onChange={e => usuarioCliente.apellido = String(e.target.value)}
                                placeholder="Ingresa tu apellido"
                            />
                        </Form.Group>
                        <Form.Group controlId="fechaNacimiento" className="mt-3">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={(e) => {
                                    const selectedDate = new Date(e.target.value);
                                    setUsuarioCliente({ ...usuarioCliente, fechaNacimiento: selectedDate });
                                }}
                                placeholder="Ingresa tu fecha de nacimiento"
                            />

                        </Form.Group>
                        <Form.Group controlId="telefono" className="mt-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={usuarioCliente.telefono}
                                onChange={e => usuarioCliente.telefono = String(e.target.value)}
                                placeholder="Ingresa tu teléfono"
                            />
                        </Form.Group>
                        <Button onClick={registrarse} type="button" className="w-100 mt-4">
                            Registrarse
                        </Button>
                        <div>
                            <p style={{ color: 'red', lineHeight: 5, padding: 5 }}>{txtValidacion}</p>
                        </div>
                    </Form>
                </div>
            </Container>

        </>
    )
}

export default Registrarse