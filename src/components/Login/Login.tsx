import { Container } from 'react-bootstrap'
import { useState } from 'react';
import Usuario from '../../types/Usuario'
import LoginService from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const login = async () => {
        console.log(usuario.email)
        
        if(usuario?.email == undefined || usuario?.email === ""){
            setTxtValidacion("Ingrese el nombre de usuario");
            return;
        }
        if(usuario?.claveEncriptada == undefined || usuario?.claveEncriptada === ""){
            setTxtValidacion("Ingrese la clave");
            return;
        }
        
        const usuariosObtenidos = await LoginService.getAllUsuarios();
        console.log(usuariosObtenidos)
        for(const usuarios of usuariosObtenidos){
            if(usuario.email == usuarios.email && usuario.claveEncriptada == usuarios.claveEncriptada){
                console.log("Correcto")
                setUsuario(usuarios);
                localStorage.setItem('usuario', JSON.stringify(usuarios));
                navigate('/', {
                    replace: true,
                    state: {
                        logged: true,
                        usuario: usuarios
                    },
                });
                window.location.reload();
                
            }else{
                console.log("inCorrecto")
                setTxtValidacion("Usuario y/o contraseña incorrecto/s.");
            }
        }

          
    }

  return (
    <>
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="border p-4 bg-light shadow-sm rounded" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <Form style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Group controlId="usuario">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control 
                            type="text" 
                            defaultValue={usuario.email} 
                            onChange={e => usuario.email = String(e.target.value)} 
                            placeholder="Ingresa tu usuario" 
                        />
                    </Form.Group>
                    <Form.Group controlId="contraseña" className="mt-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            defaultValue={usuario.claveEncriptada} 
                            onChange={e => usuario.claveEncriptada = String(e.target.value)} 
                            placeholder="Ingresa tu contraseña" 
                        />
                    </Form.Group>
                    <Button onClick={login} type="button" className="w-100 mt-4">
                        Ingresar
                    </Button>
                    <Button onClick={() => navigate('/registrarse')} type="button" className="w-100 mt-4 btn btn-secondary">
                        Registrarse
                    </Button>
                    <div>
                        <p style={{ color: 'red', lineHeight : 5, padding: 5 }}>{txtValidacion}</p>
                    </div>
                </Form>
            </div>
        </Container>
    </>
  )
}

export default Login