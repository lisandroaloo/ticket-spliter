import React, { useEffect, useState } from 'react';
import useGetProjects from '../hooks/project/UseGetProjects';
import ProjectForm from '../components/project/ProjectForm';
import { useNavigate } from 'react-router-dom';
import { IProject } from '../../interfaces';
import ProjectList from '../components/project/ProjectList';

const ProjectsList = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const { loading, getProjects } = useGetProjects();
  const navigate = useNavigate();

  const onClickRow = (id: string) => {
    navigate("/projects/" + id);
  };

  const getProjectsForTable = async () => {
    const _projects = await getProjects();
    setProjects(_projects);
  };

  useEffect(() => {
    getProjectsForTable();
  }, []);

  return (
    <>
      {loading ? (
        <section className="h-[92vh] bg-green-100 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
        </section>
      ) : (
        <>
          <section className='h-[92vh]  bg-green-100 text-white p-8'>
            <div className='max-w-4xl  mx-auto'>
              <ProjectForm setProjects={setProjects} />
              <ProjectList projects={projects} onClickRow={onClickRow} />
            </div>
          </section>

        </>
      )}
    </>
  );
};

export default ProjectsList;
