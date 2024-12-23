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
  required?: boolean
}

export interface IPagoByProjectCardProps {
  p: IPago
}

export interface IPagoPendienteByProjectCardProps {
  p: IPago
  updateProject: () => Promise<void>
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
  getProjectUsersAsync: () => Promise<void>
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
  _pr_id: string
}

export interface IProjectMembersProps {
  projectUsers: IUserWrapper[]
  getProjectUsersAsync: () => Promise<void>
  usersNotInProject: any
  projectAbierto: boolean
  hasTickets: boolean
  updateProject: () => Promise<void>
}

export interface IProjectPagosProps {
  projectPagos: IPago[]
  updateProject: () => Promise<void>
  projectUsers: IUserWrapper[]
  getProjectUsersAsync: () => Promise<void>
}

export interface IProjectTicketsProps {
  projectTickets: IProjectTickets
  projectUsers: IUserWrapper[]
  updateProject: () => Promise<void>
  projectAbierto: boolean
}

export interface ITicketByProjectCardProps {
  t: ITicket
  onClickRow: (t: ITicket) => void
}

export interface ITicketByProjectFormProps {
  ticket?: ITicketForm
  setIsAddingTicket: React.Dispatch<React.SetStateAction<boolean>>
  updateProject: () => Promise<void>
  projectUsers: IUserWrapper[]
  setEditingTicket: React.Dispatch<React.SetStateAction<ITicketForm | undefined>>
}

export interface IUserByProjectCardProps {
  up: IUserWrapper
  updateProject: () => Promise<void>
  hasTickets: boolean



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
  _ti_id?: number
  _pr_id: string
  _us_email: string
  _ti_monto: string
  _ti_descripcion: string
  _ti_fecha: Date
  _ti_image_url: string
  userPercentage: IUserPercentage[]
}

export interface IUserPercentage {
  user: IUser
  percentage: string;
}

export interface IUserPercentageBack {
  Usuario: IUser
  uxt_porcentaje: string;
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

export interface IProjectTickets {
  Ticket: ITicket[]
  montoTotal: number
}

export interface ITicket {
  ti_descripcion: string
  ti_fecha: string
  ti_id: number
  ti_monto: number
  ti_pr_id: number
  ti_us_id: string
  ti_image_url: string | undefined
  Usuario: IUsername
  UsuarioXTicket: IUserPercentageBack[]
}


export interface IUserWrapper {
  Usuario: IUser
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
}

export interface IGetProjects {
  us_email: string
}

export interface IProject {
  pr_id: string
  pr_nombre: string
  pr_descripcion: string
  pr_abierto: boolean
}

export interface IUserByProject {
  uxp_us_id: string
  uxp_pr_id: string
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
  pa_fecha: string
  pa_id: number
  pa_monto: number
  pa_pr_id: number
  pa_us_emisor_id: string
  pa_us_receptor_id: string
  Emisor?: IUsername
  Receptor?: IUsername
  pa_isEnviado: boolean
  pa_isRecibido: boolean
}

export interface IProjectHeaderProps {
  projectDetail: IProject | undefined
  loadingDetail: boolean
  getProjectDetailAsync: () => Promise<void>
  monto: IProjectTickets | undefined
  updateProject: () => Promise<void>
  getProjectPagosAsync: () => Promise<void>
}

export interface IEditProjectFormProps {
  project: IProject
  getProject: any
  setIsEditingProject: any
}

export interface IProjectList {
  projects: IProject[]
  onClickRow: (id: string) => void
}

export interface IPlanPagos{
  deudor: string,
  acreedor: string,
  monto: number

}

export interface ICloseProject {
  cerrar: () => void,
  cancelar: () => void
}

export interface IPaymentCards {
  pagos: IPago[]
  emisor?: boolean
}

export interface IProfilePaymentSend {
  pagosEmisor: IPago[]
}

export interface IProfilePaymentReceive {
  pagosReceptor: IPago[]
}

export interface IProfileTickets {
  tickets: ITicket[]
}