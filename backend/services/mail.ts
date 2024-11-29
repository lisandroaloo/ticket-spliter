import { log } from 'console';
import dotenv from 'dotenv';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dayjs = require('dayjs');



dotenv.config();

// Configura la API Key de SendGrid

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface IMailContent {
    email: string;
    subject: string;
    htmlTemplate: string;
}

const sendMail = async ({ email, subject, htmlTemplate }: IMailContent) => {
    const msg = {
        to: email,
        from: "alolisandro13@gmail.com", // Usa una dirección verificada en SendGrid
        subject,
        html: htmlTemplate,
    };

    try {
        await sgMail.send(msg);
        
    } catch (error) {
        console.error("Error enviando correo:", error);
    }
};

export { sendMail };


export const enviarRecordatorios = async () => {
    try {
 
        const pagosPendientesAEnviar = await prisma.pago.findMany({
            where: {
                pa_ultimo_recordatorio: {
                    lte: dayjs().subtract(1, 'minute').toDate(),
                },
                pa_isEnviado: false, 
            },
            include: {
                Receptor: true, 
                Emisor: true,
                Proyecto: true
            },
        });

        const pagosPendientesARecibir = await prisma.pago.findMany({
            where: {
                pa_ultimo_recordatorio: {
                    lte: dayjs().subtract(1, 'minute').toDate(),
                },
                pa_isEnviado: true,
                pa_isRecibido: false 
            },
            include: {
                Receptor: true, 
                Emisor: true,
                Proyecto: true
            },
        });


        for (const pago of pagosPendientesAEnviar) {
            const receptor = pago.Receptor.us_nombre
            const emisorEmail = pago.Emisor.us_email;
            const proyectoNombre = pago.Proyecto.pr_nombre


            // Enviar correo de recordatorio
            await sendMail({
                email: emisorEmail,
                subject: 'Pago pendiente',
                htmlTemplate: `Hola, tienes un pago pendiente de $${pago.pa_monto} a ${receptor} en el proyecto ${proyectoNombre}`,
            });

            // Actualizar la fecha del último recordatorio
            await prisma.pago.update({
                where: { pa_id: pago.pa_id },
                data: { pa_ultimo_recordatorio: new Date() },
            });
            
            console.log("pagoenviado", emisorEmail);
        }

        for (const pago of pagosPendientesARecibir) {
    
            const receptorEmail = pago.Receptor.us_email
      
            const emisorNombre = pago.Emisor.us_nombre;
            const proyectoNombre = pago.Proyecto.pr_nombre


            // Enviar correo de recordatorio
            await sendMail({
                email: receptorEmail,
                subject: 'Pago pendiente de recepcion',
                htmlTemplate: `Hola, tienes un pago de $${pago.pa_monto} de parte de ${emisorNombre} pendiente de recepcion en el proyecto ${proyectoNombre}`,
            });

            // Actualizar la fecha del último recordatorio
            await prisma.pago.update({
                where: { pa_id: pago.pa_id },
                data: { pa_ultimo_recordatorio: new Date() },
            });
            
            console.log("pagoenviadoRecep", receptorEmail);
        }

        

        
        

    } catch (error) {
        console.log(error);
    }
};