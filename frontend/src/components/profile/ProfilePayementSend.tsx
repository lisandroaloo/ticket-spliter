import React from 'react'
import { IProfilePaymentSend } from '../../../interfaces'
import PaymentCards from './PaymentCards'


const ProfilePayementSend = ({ pagosEmisor }: IProfilePaymentSend) => {
    return (
        <div className='m-2'>

            <PaymentCards pagos={pagosEmisor}  />
        </div>
    )
}

export default ProfilePayementSend