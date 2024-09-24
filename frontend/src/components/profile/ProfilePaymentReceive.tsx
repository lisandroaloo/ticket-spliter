import React from 'react'
import { IPago } from '../../../interfaces'
import PaymentCards from './PaymentCards'

export interface IProfilePaymentReceive {
    pagosReceptor: IPago[]
}

const ProfilePaymentReceive = ({pagosReceptor}: IProfilePaymentReceive) => {
    return (
        <div className='m-2'>

            <PaymentCards pagos={pagosReceptor} emisor />
        </div>
    )
}

export default ProfilePaymentReceive