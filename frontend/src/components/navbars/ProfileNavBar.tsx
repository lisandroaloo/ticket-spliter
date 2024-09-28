import React from 'react'


interface IProjectNavbar {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
    activeSection: string
}

const ProfileNavBar = ({ setActiveSection, activeSection }: IProjectNavbar) => {
    return (
        <nav className="flex border-b  h-1/5 border-green-700">
            <button
                className={`flex items-center rounded-tl-lg justify-center px-4 py-3 font-medium text-sm transition-all duration-300 ease-in-out flex-1
                            ${activeSection === 'tickets'
                        ? 'bg-green-700 text-green-400'
                        : 'text-green-400 hover:bg-green-700 hover:text-green-300'}`}
                onClick={() => setActiveSection('tickets')}
            >

                Tickets
            </button>
            <button
                className={`flex items-center justify-center px-4 py-3 font-medium text-sm transition-all duration-300 ease-in-out flex-1
                            ${activeSection === 'sent'
                        ? 'bg-green-700 text-green-400'
                        : 'text-green-400 hover:bg-green-700 hover:text-green-300'}`}
                onClick={() => setActiveSection('sent')}
            >

                Pagos enviados
            </button>
            <button
                className={`flex items-center justify-center rounded-tr-lg px-4 py-3 font-medium text-sm transition-all duration-300 ease-in-out flex-1
                            ${activeSection === 'received'
                        ? 'bg-green-700 text-green-400'
                        : 'text-green-400 hover:bg-green-700 hover:text-green-300'}`}
                onClick={() => setActiveSection('received')}
            >

                Pagos recibidos
            </button>
        </nav>
    )
}

export default ProfileNavBar