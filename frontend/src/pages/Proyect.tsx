import React, { useEffect, useState } from 'react';
import { IUserByProject } from './Proyects';
import useGetProyectByIDDeep from '../hooks/useGetProyectByIDDeep';
import { useParams } from 'react-router';

export interface IProyectDeep {
  UsuarioXProyecto: IUserByProject[];
  pr_descripcion: string;
  pr_id: string;
  pr_nombre: string;
}

const Proyect = () => {
  const { id } = useParams<{ id: string }>();
  const [proyect, setProyect] = useState<IProyectDeep>();
  const { getProyectsByIDDeep } = useGetProyectByIDDeep();

  const getProyect = async () => {

    const _proyect = await getProyectsByIDDeep(+id!);
  
    console.log(_proyect    );
    
    setProyect(_proyect);

  };

  useEffect(() => {
    getProyect();



    console.log(proyect);
  }, []);

  return (
    <section className='h-[92vh]'>
      <div> 
        <h2>{proyect?.pr_descripcion}</h2>
        <h2>1000$</h2>
      </div>
      <div>
        {proyect?.UsuarioXProyecto.map((up)=> up.uxp_us_id)}
      </div>
    </section>
  );
};

export default Proyect;
