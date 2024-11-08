import dotenv from 'dotenv';


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
        from: "ticketspliter@gmail.com", // Usa una dirección verificada en SendGrid
        subject,
        html: htmlTemplate,
    };

    try {
        await sgMail.send(msg);
        console.log("Correo enviado con éxito");
    } catch (error) {
        console.error("Error enviando correo:", error);
    }
};

export { sendMail };
