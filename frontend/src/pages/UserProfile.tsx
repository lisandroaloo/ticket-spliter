import React, { useEffect, useState } from 'react'
import useGetUserById from '../hooks/user/useGetUserById'
import TextInput from '../components/TextInput'
import useEditUser from '../hooks/user/useEditUser'
import useGetTicketsByUserId from '../hooks/ticket/useGetTicketsByUserId'
import useGetPagosByEmisor from '../hooks/pagos/useGetPagosByEmisor'
import useGetPagosByReceptor from '../hooks/pagos/useGetPagoByReceptor'
import { ITicket, IPago, IUser } from '../../interfaces'
import ProfileTickets from '../components/profile/ProfileTickets'
import ProfilePayementSend from '../components/profile/ProfilePayementSend'
import ProfilePaymentReceive from '../components/profile/ProfilePaymentReceive'
import ProfileNavBar from '../components/navbars/ProfileNavBar'

const UserProfile = () => {
    const { getTicketsByUserId } = useGetTicketsByUserId()
    const [tickets, setTickets] = useState<ITicket[]>([])

    const { getPagosByEmisor } = useGetPagosByEmisor()
    const [pagosEmisor, setPagosEmisor] = useState<IPago[]>([])

    const { getPagosByReceptor } = useGetPagosByReceptor()
    const [pagosReceptor, setPagosReceptor] = useState<IPago[]>([])


    const initializeUserForm = (): IUser => {
        return {
            us_email: '',
            us_nombre: '',
            us_password: '',
        }
    }
    const [user, setUser] = useState<IUser>(initializeUserForm())
    const { getUser } = useGetUserById()
    const { editUser } = useEditUser()

    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState('tickets')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleEditUser = async (e: React.FormEvent) => {
        e.preventDefault()
        await editUser(user)
        alert('USUARIO EDITADO')
    }

    const getData = async () => {
        setLoading(true)
        const _user = await getUser()
        setUser(_user || initializeUserForm())
        const _tickets = await getTicketsByUserId()
        setTickets(_tickets)
        const _pagosEmisor = await getPagosByEmisor()
        setPagosEmisor(_pagosEmisor)
        const _pagosReceptor = await getPagosByReceptor()
        setPagosReceptor(_pagosReceptor)
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {loading ? (
                <section className="h-[92vh] bg-gray-900 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </section>
            ) : (
                <section className="h-[92vh] bg-gray-900 relative">
                    <div className="absolute inset-0 top-[15%] mx-auto max-w-2xl text-white h-[50vh]">
                        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
                        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 h-[50vh]">
                            <form onSubmit={handleEditUser} className="h-full">
                                <div className="rounded-lg p-6 shadow-sm bg-gray-700 h-[50vh]">
                                    <div className="flex gap-3 items-center mb-3">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                            <i className="bi bi-person text-black text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold m-0">{user.us_nombre}</p>
                                            <p className="text-muted-foreground m-0">{user.us_email}</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="us_nombre">Name</label>
                                            <TextInput
                                                type="text"
                                                name="us_nombre"
                                                value={user.us_nombre || ''}
                                                placeholder=""
                                                classNames="rounded bg-gray-900 p-1"
                                                handleInputChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="us_email">Email</label>
                                            <TextInput
                                                type="email"
                                                name="us_email"
                                                classNames="rounded bg-gray-900 p-1"
                                                placeholder=""
                                                readOnly
                                                value={user.us_email || ''}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="us_password">Password</label>
                                            <TextInput
                                                name="us_password"
                                                value={user.us_password || ''}
                                                classNames="rounded bg-gray-900 p-1"
                                                type="password"
                                                placeholder="Enter new password"
                                                handleInputChange={handleInputChange}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="rounded bg-white text-black p-1 mt-1"
                                        >
                                            Update Profile
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="h-[50vh] bg-gray-800">
                                <ProfileNavBar setActiveSection={setActiveSection} activeSection={activeSection} />

                                <div className="  h-4/5 overflow-y-scroll  no-scrollbar">
                                    {activeSection === 'tickets' && <ProfileTickets tickets={tickets} />}
                                    {activeSection === 'sent' && <ProfilePayementSend pagosEmisor={pagosEmisor} />}
                                    {activeSection === 'received' && <ProfilePaymentReceive pagosReceptor={pagosReceptor} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default UserProfile
