import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, message, botcheck } = data;

    // Honeypot spam check: if hidden botcheck field is filled, reject quietly
    if (botcheck) {
      return new Response(
        JSON.stringify({ success: false, error: 'Spam submission detected.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a valid name (at least 2 characters).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a message (at least 5 characters).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 100);
    const sanitizedMessage = message.trim().slice(0, 2000);

    const resendApiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || import.meta.env.CONTACT_EMAIL || 'ashankavinda277@gmail.com';

    if (resendApiKey) {
      // Send real email via Resend HTTP API
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: recipientEmail,
          subject: `Portfolio Contact: Message from ${sanitizedName}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedMessage.replace(/\n/g, '<br/>')}</p>
          `,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.json().catch(() => ({}));
        console.error('Resend API Error:', errorData);
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to deliver email message. Please try again later.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Simulation mode in development if RESEND_API_KEY is not configured
      console.log('--- [CONTACT FORM SUBMISSION SIMULATION] ---');
      console.log(`From: ${sanitizedName} <${sanitizedEmail}>`);
      console.log(`Message: ${sanitizedMessage}`);
      console.log('---------------------------------------------');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Thank you! Your message has been sent successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Contact API Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected server error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
