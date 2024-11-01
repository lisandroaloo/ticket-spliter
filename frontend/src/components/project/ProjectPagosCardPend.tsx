import React from 'react'
import { IPlanPagos } from '../../../interfaces'

interface IProjectPagosPend {
    p: IPlanPagos
}

const ProjectPagosCardPend = ({ p }: IProjectPagosPend) => {


    return (
        <div className="flex mb-2 justify-between items-center bg-gradient-to-br from-emerald-500 to-green-700 text-green-100 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
                <span>{p.deudor + ' --> ' + p.acreedor}</span>
            </div>
            <div className="flex items-center space-x-3">
                <span>${p.monto}</span>

            </div>
        </div>
    )
}

export default ProjectPagosCardPend