import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const emailTemplates = {
  orderConfirmation: (orderNumber: string, total: number, items: any[]) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2C5326; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .order-details { background: white; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Order Confirmed!</h1>
        </div>
        <div class="content">
          <p>Thank you for shopping with Lamafrican Fashion!</p>
          <div class="order-details">
            <h2>Order #${orderNumber}</h2>
            <p><strong>Total:</strong> KShs ${total.toLocaleString()}</p>
            <h3>Items:</h3>
            <ul>
              ${items.map(item => `<li>${item.name} x ${item.quantity} - KShs ${item.subtotal.toLocaleString()}</li>`).join('')}
            </ul>
          </div>
          <p>We'll send you a shipping confirmation email as soon as your order ships.</p>
        </div>
        <div class="footer">
          <p>Lamafrican Fashion | Life isn't perfect but your outfit can be</p>
        </div>
      </div>
    </body>
    </html>
  `
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `"Lamafrican Fashion" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Email send error:', error);
  }
};

export default transporter;
