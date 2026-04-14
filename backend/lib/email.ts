// backend/lib/email.ts
import sgMail from '@sendgrid/mail';
import { ProposalResponse } from '@/types';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export interface EmailPayload {
  to: string;
  clientName: string;
  subject: string;
  proposal?: ProposalResponse;
  type: 'confirmation' | 'proposal' | 'reminder';
}

export async function sendProposalEmail(payload: EmailPayload) {
  const { to, clientName, proposal, type } = payload;

  let htmlContent = '';

  if (type === 'confirmation') {
    htmlContent = `
      <h2>¡Hola ${clientName}!</h2>
      <p>Hemos recibido tu solicitud. Nuestro equipo está preparando una propuesta personalizada para tu evento.</p>
      <p>Nos pondremos en contacto en las próximas 24 horas.</p>
      <p>Gracias por confiar en DOS2A.</p>
    `;
  } else if (type === 'proposal' && proposal) {
    const social = proposal.tiers.social;
    const escenico = proposal.tiers.escenico;
    const corporativo = proposal.tiers.corporativo;

    htmlContent = `
      <h2>Tu propuesta personalizada - DOS2A</h2>
      <p>Hola ${clientName},</p>
      <p>Aquí encontrarás tres opciones para tu evento:</p>
      
      <h3>📍 Opción Social</h3>
      <p>${social.description}</p>
      <p><strong>Precio:</strong> ${social.priceRange}</p>
      <p><strong>Tiempo de preparación:</strong> ${social.leadTime}</p>
      <ul>
        ${social.specs.map((s) => `<li>${s}</li>`).join('')}
      </ul>
      
      <h3>📍 Opción Escénico</h3>
      <p>${escenico.description}</p>
      <p><strong>Precio:</strong> ${escenico.priceRange}</p>
      <p><strong>Tiempo de preparación:</strong> ${escenico.leadTime}</p>
      <ul>
        ${escenico.specs.map((s) => `<li>${s}</li>`).join('')}
      </ul>
      
      <h3>📍 Opción Corporativo</h3>
      <p>${corporativo.description}</p>
      <p><strong>Precio:</strong> ${corporativo.priceRange}</p>
      <p><strong>Tiempo de preparación:</strong> ${corporativo.leadTime}</p>
      <ul>
        ${corporativo.specs.map((s) => `<li>${s}</li>`).join('')}
      </ul>
      
      <h3>Próximos pasos:</h3>
      <ol>
        ${proposal.nextSteps.map((step) => `<li>${step}</li>`).join('')}
      </ol>
      
      <p>¿Preguntas? Contacta directamente con nosotros.</p>
      <p>DOS2A - Audio & Iluminación Premium</p>
    `;
  }

  try {
    await sgMail.send({
      to,
      from: 'noreply@dos2a.com',
      subject: payload.subject,
      html: htmlContent,
      trackingSettings: {
        clickTracking: { enabled: true },
        openTracking: { enabled: true },
      },
    });

    console.log(`Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendNotificationEmail(
  to: string,
  clientName: string,
  eventType: string
) {
  const htmlContent = `
    <h2>Nueva solicitud de evento - DOS2A</h2>
    <p>Tienes una nueva solicitud de cliente:</p>
    <ul>
      <li><strong>Nombre:</strong> ${clientName}</li>
      <li><strong>Tipo de evento:</strong> ${eventType}</li>
      <li><strong>Email:</strong> ${to}</li>
    </ul>
    <p>Accede al dashboard para ver detalles completos y generar la propuesta.</p>
  `;

  try {
    await sgMail.send({
      to: 'admin@dos2a.com',
      from: 'noreply@dos2a.com',
      subject: `Nueva solicitud: ${eventType}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error('Notification email error:', error);
    // Don't throw - continue if notification fails
    return { success: false };
  }
}
