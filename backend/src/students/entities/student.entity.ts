import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('date')
  fechaNacimiento: Date;

  @Column()
  nombrePadre: string;

  @Column()
  nombreMadre: string;

  @Column()
  grado: string;

  @Column()
  seccion: string;

  @Column('date')
  fechaIngreso: Date;
}
