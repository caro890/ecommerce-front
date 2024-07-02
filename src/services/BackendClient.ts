import { AbstractBackendClient } from "./AbstractBackendClient";

export const base: string = "http://localhost:8095/";

export abstract class BackendClient<T> extends AbstractBackendClient<T> {

  //getAllByBajaFalse
  async getAll(): Promise<T[]> {

    const response = await fetch(`${this.baseUrl}`);
    const data = await response.json();
    return data as T[];
  }

  //getById
  async getById(id: number): Promise<T | undefined> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      return undefined;
    }
    const data = await response.json();
    return data as T;
  }

  //create
  async post(data: T): Promise<T> {

    const response = await fetch(`${this.baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanzar un error con el mensaje de error
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido');
    }

    const newData = await response.json();
    return newData as T;
  }

  //edit
  async put(id: number, data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as T;
  }

  //deleteById
  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar el elemento con ID ${id}`);
    }
  }
}