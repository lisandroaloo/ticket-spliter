import React from 'react'
import { IProfilePaymentReceive } from './ProfilePaymentReceive'
import { IPago } from '../../../interfaces'

export interface IPaymentCards{
    pagos: IPago[]
    emisor?: boolean
}

const PaymentCards = ({ pagos, emisor }: IPaymentCards) => {
    return (
        <>

            {pagos.map((pr) => (
                <div className="rounded-lg p-2 mb-1 shadow-sm bg-gray-700">
                    <div key={pr.pa_id}>{(emisor ? pr.emisor?.us_nombre : pr.receptor?.us_nombre) + ' - ' + pr.pa_fecha.split('T')[0] + ' - $' + pr.pa_monto}</div>
                </div>
            ))}
        </>
    )
}

export default PaymentCards