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

    console.log(_proyect);

    setProyect(_proyect);

  };

  useEffect(() => {
    getProyect();



    console.log(proyect);
  }, []);

  return (

    <section className='h-[92vh] bg-gray-900'>

      <div className='flex items-center justify-center mb-4 space-x-3'>

        <h1 className='text-white'>{proyect?.pr_nombre}</h1>
        <button className="p-3 text-white rounded-full bg-gray-700 hover:bg-gray-400">
          ✏️
        </button>
      </div>
      <div className="bg-[#1e293b] rounded-lg shadow-lg mb-6 p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Gastos</h2>
        <div className="text-3xl text-white font-bold">$52300000</div>
      </div>



      <div>

        <div className="bg-[#1e293b] rounded-lg shadow-lg p-4 mb-4">
          <h2 className="text-2xl font-bold text-white mb-4">Integrantes</h2>
          <div className="space-y-4">

            {proyect?.UsuarioXProyecto.map((up) => (

              <div className="flex justify-between items-center bg-gray-700 text-white p-3 rounded-lg">
                <div className="flex items-center space-x-3">

                  <span>{up.uxp_us_id}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>${up.uxp_porcentaje}</span>
                  <span className="bg-[#4fd1c5] text-[#1e293b] px-2 py-1 rounded-full text-xs">
                    {up.uxp_porcentaje}%
                  </span>
                </div>
              </div>

            ))}

          </div>
          <button className="p-3 text-white mt-4 rounded-full bg-gray-700 hover:bg-gray-400">
            ➕
          </button>
        </div>



      </div>
    </section>
  );
};

export default Proyect;
