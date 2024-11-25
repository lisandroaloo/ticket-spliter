import React from 'react'
import { IPaymentCards } from '../../../interfaces'


const PaymentCards = ({ pagos, emisor }: IPaymentCards) => {
    
    
    return (
      <>
        {pagos.map((pr, index) => (
          <div
            key={index}
            className="rounded-lg p-2 mb-1 shadow-sm bg-green-700"
          >
            <div>{(emisor ? pr.Emisor?.us_nombre : pr.Receptor?.us_nombre) + ' - ' + pr.pa_fecha.split('T')[0] + ' - $' + pr.pa_monto + (pr.pa_isRecibido ? '' : ' - ⌛')}</div>
          </div>
        ))}
      </>
    )
}

export default PaymentCards