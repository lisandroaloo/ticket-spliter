import React from 'react'
import { IProfilePaymentReceive } from '../../../interfaces'
import PaymentCards from './PaymentCards'

const ProfilePaymentReceive = ({pagosReceptor}: IProfilePaymentReceive) => {
    return (
        <div className='m-2'>

            <PaymentCards pagos={pagosReceptor} emisor />
        </div>
    )
}

export default ProfilePaymentReceive