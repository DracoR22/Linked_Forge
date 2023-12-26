import nodemailer, { Transporter } from "nodemailer"

interface EmailOptions {
    email: string
    subject: string
    data: {[key: string]: any}
}

const sendMail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const { email, subject, data } = options

    const html = `
    <!DOCTYPE html>
      <html lang="en">
       <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Activation</title>
          </head>
           <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin: 20px auto; padding: 20px;">
            <tr>
              <td align="center" bgcolor="#1919ff" style="padding: 20px;">
                <h1 style="color: #ffffff;">Account Activation</h1>
              </td>
           </tr>
           <tr>
              <td style="padding: 20px;">
                <p>Dear ${data.name},</p>
                <p>Thank you for signing up for our service. To activate your account, please click the button below:</p>
                <p style="text-align: center;">
                    <h2>${data.activationCode}</h2>
                </p>
                <p>Please enter this code on the activation page within the next 5 minutes.</p>
                <p>If you did not request this activation, you can safely ignore this email.</p>
                <p>Best Regards,</p>
                <p>Linked Forge</p>
             </td>
           </tr>
        </table>
      </body>
  </html>
    `
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    }

    await transporter.sendMail(mailOptions)
}

export default sendMail
