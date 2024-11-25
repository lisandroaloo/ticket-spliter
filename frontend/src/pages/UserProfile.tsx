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
import toast from 'react-hot-toast'
import useCloseAccount from '../hooks/useCloseAccount'


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
  const { closeAccount } = useCloseAccount() // Hook para cerrar la cuenta

  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('tickets')

  const [showDelete, setShowDelete] = useState(false) // Estado para el modal

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
    toast.success('Usuario editado con éxito')
  }

  const handleDeleteAccount = async () => {
    try {
      await closeAccount(user.us_email)
     
      setShowDelete(false)
    } catch (error) {
      toast.error('Error al eliminar la cuenta.')
    }
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
        <section className="h-[92vh] bg-green-100 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
        </section>
      ) : (
        <section className="md:h-[92vh] h-full bg-green-100 relative">
          <div className="pt-2 md:pt-0 md:absolute md:inset-0 h-full md:top-[12%] bg-green-100 px-3 mx-auto max-w-2xl md:max-w-4xl text-green-100 md:h-[50vh]">
            <h2 className="text-3xl font-bold tracking-tight text-black">Perfil</h2>
            <div className="mt-8 pb-2 grid grid-cols-1 gap-4 md:grid-cols-2 md:h-[50vh]">
              <form onSubmit={handleEditUser} className="h-full">
                <div className="rounded-lg p-6 shadow-sm bg-gradient-to-br from-emerald-700 to-green-800 h-[50vh]">
                  <div className="flex gap-3 items-center mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="bi bi-person text-green-800 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-lg font-semibold m-0">{user.us_nombre}</p>
                      <p className="text-muted-foreground m-0">{user.us_email}</p>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <label htmlFor="us_nombre">Nombre</label>
                      <TextInput
                        type="text"
                        name="us_nombre"
                        value={user.us_nombre || ''}
                        placeholder=""
                        classNames="rounded bg-green-900 p-1"
                        handleInputChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="us_email">Correo Electrónico</label>
                      <TextInput
                        type="email"
                        name="us_email"
                        classNames="rounded bg-green-900 p-1"
                        placeholder=""
                        readOnly
                        value={user.us_email || ''}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="us_password">Contraseña</label>
                      <TextInput
                        name="us_password"
                        value={user.us_password || ''}
                        classNames="rounded bg-green-900 p-1"
                        type="password"
                        placeholder="Ingrese nueva contraseña"
                        handleInputChange={handleInputChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded bg-green-100 text-green-800 p-1 mt-1"
                    >
                      Actualizar Perfil
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDelete(true)}
                      className="rounded bg-red-500 text-white p-1 mt-1"
                    >
                      Eliminar cuenta
                    </button>
                  </div>
                </div>
              </form>
              <div className="h-[50vh] rounded-lg bg-gradient-to-br from-emerald-700 to-green-800">
                <ProfileNavBar
                  setActiveSection={setActiveSection}
                  activeSection={activeSection}
                />

                <div className="h-4/5  overflow-y-scroll no-scrollbar">
                  {activeSection === 'tickets' && <ProfileTickets tickets={tickets} />}
                  {activeSection === 'sent' && (
                    <ProfilePayementSend
                      pagosEmisor={pagosEmisor.filter((pago) => pago.pa_isEnviado)}
                    />
                  )}
                  {activeSection === 'received' && (
                    <ProfilePaymentReceive
                      pagosReceptor={pagosReceptor.filter((pago) => pago.pa_isRecibido)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Modal para confirmar eliminación de cuenta */}
      {showDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Confirmar eliminación</h2>
            <p className="text-lg mb-4">
              ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3 mt-4">
            <button
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowDelete(false)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserProfile
