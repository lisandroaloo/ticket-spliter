import React from 'react'


interface IProjectNavbar {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
    activeSection: string
}

const ProfileNavBar = ({ setActiveSection, activeSection }: IProjectNavbar) => {
    return (
        <nav className="flex border-b h-1/5 border-gray-700">
            <button
                className={`flex items-center justify-center px-4 py-3 font-medium text-sm transition-all duration-300 ease-in-out flex-1
                            ${activeSection === 'tickets'
                        ? 'bg-gray-700 text-blue-400'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-blue-300'}`}
                onClick={() => setActiveSection('tickets')}
            >

                Tickets
            </button>
            <button
                className={`flex items-center justify-center px-4 py-3 font-medium text-sm transition-all duration-300 ease-in-out flex-1
                            ${activeSection === 'sent'
                        ? 'bg-gray-700 text-blue-400'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-blue-300'}`}
                onClick={() => setActiveSection('sent')}
            >

                Sent Payments
            </button>
            <button
                className={`flex items-center justify-center px-4 py-3 font-medium text-sm transition-all duration-300 ease-in-out flex-1
                            ${activeSection === 'received'
                        ? 'bg-gray-700 text-blue-400'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-blue-300'}`}
                onClick={() => setActiveSection('received')}
            >

                Received Payments
            </button>
        </nav>
    )
}

export default ProfileNavBar