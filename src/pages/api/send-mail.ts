import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, company, service, message } = data;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: "Faltan campos requeridos" }), { status: 400 });
    }

    // Create Transporter
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(import.meta.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `"Web Fagaz" <${import.meta.env.SMTP_USER}>`, // Sender address
      to: 'lucagazze1@gmail.com', // List of receivers (can be env var too)
      replyTo: email,
      subject: `Nuevo Contacto Web: ${name} - ${service || 'General'}`,
      text: `
        Nuevo mensaje de contacto desde la web:
        
        Nombre: ${name}
        Empresa: ${company || 'N/A'}
        Email: ${email}
        Teléfono: ${phone || 'N/A'}
        Servicio: ${service || 'N/A'}
        
        Mensaje:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #433ba0;">Nuevo Mensaje de Contacto</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Empresa:</strong> ${company || 'N/A'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone || 'N/A'}</p>
            <p><strong>Servicio:</strong> ${service || 'N/A'}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Mensaje:</h3>
            <p style="background-color: #fff; padding: 15px; border: 1px solid #eee; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
        </div>
      `
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "¡Mensaje enviado con éxito!" }), { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Error al enviar el correo. Por favor intente más tarde." }), { status: 500 });
  }
};
