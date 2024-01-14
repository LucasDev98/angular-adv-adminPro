import { Hospital } from './hospital.model';

export class MedicalModel {
  constructor(
    public _id: string,
    public name: string,
    public user: string,
    public img: string = 'no-image',
    public hospital: Hospital
  ) {}
}
