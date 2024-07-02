import Usuario from "../types/Usuario";

const BASE_URL = "http://localhost:8095/";

export const LoginService = {
   
    getAllUsuarios: async (): Promise<Usuario[]> => {
        const response = await fetch(`${BASE_URL}` + 'usuarios')
        const data = await response.json();

        return data;
    },
}

export default LoginService;
