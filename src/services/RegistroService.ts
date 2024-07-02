import UsuarioClienteJSON from "../types/UsuarioClienteJSON";

const BASE_URL = "http://localhost:8095/";

export const RegistroService = {

    //registrar usuario
    addUsuarioCliente: async (user: UsuarioClienteJSON): Promise<UsuarioClienteJSON> => {
        const response = await fetch(`${BASE_URL}clientes/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud de inserción de usuario');
        }

        const data = await response.json();
        return data;
    }
}

export default RegistroService;
