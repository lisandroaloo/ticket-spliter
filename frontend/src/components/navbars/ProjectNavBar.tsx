import React from 'react'

interface IProjectNavbar {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
  activeSection: string
}

const ProjectNavBar = ({setActiveSection, activeSection}: IProjectNavbar) => {
  return (
    <nav className="flex mb-6 border-b border-green-700">
      <button
        className={`flex  items-center justify-center px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-300 ease-in-out mr-2
                    ${activeSection === 'members' ? 'bg-gradient-to-br from-emerald-400 to-green-700 text-green-400 shadow-lg transform' : 'bg-green-200 text-green-700 hover:bg-gradient-to-br from-emerald-400 to-green-700 hover:text-green-300'}`}
        onClick={() => setActiveSection('members')}
      >
        MIEMBROS
      </button>
      <button
        className={`flex items-center justify-center px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-300 ease-in-out mr-2
                    ${activeSection === 'tickets' ? 'bg-gradient-to-br from-emerald-400 to-green-700 text-green-400 shadow-lg transform' : 'bg-green-200 text-green-700 hover:bg-gradient-to-br from-emerald-400 to-green-700 hover:text-green-300'}`}
        onClick={() => setActiveSection('tickets')}
      >
        TICKETS
      </button>
      <button
        className={`flex items-center justify-center px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-300 ease-in-out
                    ${activeSection === 'payments' ? 'bg-gradient-to-br from-emerald-400 to-green-700 text-green-400 shadow-lg transform' : 'bg-green-200 text-green-700 hover:bg-gradient-to-br from-emerald-400 to-green-700 hover:text-green-300'}`}
        onClick={() => setActiveSection('payments')}
      >
        PAGOS
      </button>
    </nav>
  )
}

export default ProjectNavBar