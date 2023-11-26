import { UsuarioModel } from '../models/usuario.model';

export interface ResponseUsuarios {
  total: number;
  users: UsuarioModel[];
}
