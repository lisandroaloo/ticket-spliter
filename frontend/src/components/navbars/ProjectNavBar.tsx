import React from 'react'

interface IProjectNavbar {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
  activeSection: string
}

const ProjectNavBar = ({setActiveSection, activeSection}: IProjectNavbar) => {
  return (
    <nav className="flex mb-6 border-b border-gray-700">
      <button
        className={`flex  items-center justify-center px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-300 ease-in-out mr-2
                    ${activeSection === 'members' ? 'bg-gray-700 text-blue-400 shadow-lg transform' : 'bg-[#1e293b] text-gray-400 hover:bg-gray-700 hover:text-blue-300'}`}
        onClick={() => setActiveSection('members')}
      >
        MIEMBROS
      </button>
      <button
        className={`flex items-center justify-center px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-300 ease-in-out mr-2
                    ${activeSection === 'tickets' ? 'bg-gray-700 text-blue-400 shadow-lg transform' : 'bg-[#1e293b] text-gray-400 hover:bg-gray-700 hover:text-blue-300'}`}
        onClick={() => setActiveSection('tickets')}
      >
        TICKETS
      </button>
      <button
        className={`flex items-center justify-center px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-300 ease-in-out
                    ${activeSection === 'payments' ? 'bg-gray-700 text-blue-400 shadow-lg transform' : 'bg-[#1e293b] text-gray-400 hover:bg-gray-700 hover:text-blue-300'}`}
        onClick={() => setActiveSection('payments')}
      >
        PAGOS
      </button>
    </nav>
  )
}

export default ProjectNavBar