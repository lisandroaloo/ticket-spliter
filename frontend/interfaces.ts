import { Dispatch, SetStateAction, ReactNode } from "react"

export interface ICard {
  icon: string
  title: string
  description: string
}

export interface ITextInput {
  type: string
  name: string
  value: string
  readOnly?: boolean
  placeholder: string
  classNames?: string
  handleInputChange?: (param: any) => void
  handleOnBlur?: (param: any) => void
}

export interface IPagoByProjectCardProps {
  p: IPago
}

export interface IPagoForm {
  pa_fecha: Date
  pa_us_receptor_id: string
  pa_monto: string
  pa_pr_id: string
}

export interface IPagoByProjectFormProps {
  pago?: IPagoForm
  setIsAddingPago: React.Dispatch<React.SetStateAction<boolean>>
  updateProject: () => Promise<void>
  usersInProyect: IUserWrapper[]
}

export interface IProjectFormProps {
  setProjects: Dispatch<SetStateAction<IProject[]>>
}

export interface IProjectForm {
  _pr_id: string
  _pr_nombre: string
  _pr_descripcion: string
}

export interface IUserByProjectForm {
  _uxp_us_id: string
  _uxp_porcentaje?: string
  _pr_id: string
}

export interface IProjectMembersProps {
  setEditingPercentages: any
  editingPercentages: IPercentageByUser[]
  project: IProjectDeep | undefined
  getProject: any
}

export interface IProjectPagosProps {
  getProject: any 
  project: IProjectDeep | undefined
}

export interface IProjectTicketsProps {
  project: IProjectDeep | undefined
  getProject: any
}

export interface ITicketByProjectCardProps {
  t: ITicket
}

export interface ITicketByProjectFormProps {
  ticket?: ITicketForm
  setIsAddingTicket: React.Dispatch<React.SetStateAction<boolean>>
  updateProject: () => Promise<void>
  usersInProyect: IUserWrapper[]
}

export interface IUserByProjectCardProps {
  up: IUserWrapper
  monto: number
  isEditingPercentages: boolean
  index: number
  editPercentage: (index: number, newPercentage: number) => void
  value: number
}

export interface IUserByProjectFormProps {
  user?: IUserByProjectForm
  setIsAddingUser: React.Dispatch<React.SetStateAction<boolean>>
  updateProject: () => Promise<void>
  usersNotInProject: IUser[]
}


export interface AuthContextType {
  authUser: any
  setAuthUser: React.Dispatch<React.SetStateAction<any>>
}

export interface IAuthContextProviderProps {
  children: ReactNode
}

export interface ICreatePago {
  pr_id: number
  receptor_us_email: string
  pa_monto: number
  pa_fecha: Date
}

export interface ITicketForm {
  _pr_id: string
  _us_email: string
  _ti_monto: string
  _ti_descripcion: string
  _ti_fecha: Date
}

export interface IGetSpentByProjectId {
  _pr_id: string
  _us_email: string
}

export interface ILogin {
  us_email: string
  us_password: string
}

export interface IProjectDeep {
  Ticket: ITicket[]
  Pago: IPago[]
  UsuarioXProyecto: IUserWrapper[]
  pr_descripcion: string
  pr_id: string
  pr_nombre: string
  montoTotal: number
  usersNotInProject: IUser[]
}

export interface ITicket {
  map(arg0: (t: any) => import("react/jsx-runtime").JSX.Element): ReactNode
  ti_descripcion: string
  ti_fecha: string
  ti_id: number
  ti_monto: number
  ti_pr_id: number
  ti_us_id: string
  Usuario: IUsername
}

export interface IUserWrapper {
  Usuario: IUser
  uxp_porcentaje: number
}

export interface IUsername {
  us_nombre: string
}

export interface IUser {
  us_email: string
  us_nombre: string
}

export interface IPercentageByUser {
  us_email: string
  uxp_porcentaje: number
}

export interface IGetProjects {
  us_email: string
}

export interface IProject {
  pr_id: string
  pr_nombre: string
  pr_descripcion: string
}

export interface IUserByProject {
  uxp_us_id: string
  uxp_pr_id: string
  uxp_porcentaje: string
}

export interface IRegisterInputs {
  us_nombre: string
  us_email: string
  us_password: string
  confirmPassword: string
}

export interface IUser {
  us_email: string
  us_nombre: string
  us_password: string
}

export interface IPago {
  pa_estado: string
  pa_fecha: string
  pa_id: number
  pa_monto: number
  pa_pr_id: number
  pa_us_emisor_id: string
  pa_us_receptor_id: string
  emisor?: IUsername
  receptor?: IUsername
}

export interface IProjectHeaderProps {
  project: IProjectDeep | undefined
  getProject: any
  loading: boolean
}

export interface IEditProjectFormProps {
  project: IProjectDeep
  getProject: any
  setIsEditingProject: any
}