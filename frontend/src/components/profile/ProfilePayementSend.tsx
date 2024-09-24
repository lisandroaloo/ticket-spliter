import React from 'react'
import { IPago } from '../../../interfaces'
import PaymentCards from './PaymentCards'

export interface IProfilePaymentSend {

    pagosEmisor: IPago[]

}

const ProfilePayementSend = ({ pagosEmisor }: IProfilePaymentSend) => {
    return (
        <div className='m-2'>

            <PaymentCards pagos={pagosEmisor}  />
        </div>
    )
}

export default ProfilePayementSend