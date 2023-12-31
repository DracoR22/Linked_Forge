import nodemailer, { Transporter } from "nodemailer"

interface EmailOptions {
    email: string
    subject: string
    data: {[key: string]: any}
}

const resetPasswordMail = async (options: EmailOptions): Promise<void> => {
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
      <title>Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: rgb(231, 228, 223);">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="500" border="0" cellspacing="0" cellpadding="0" style="border-radius: 12px; background-color: white; padding: 50px;">
          <tr>
            <td align="center">
              <h1 style="text-align: center;">
                Linked <span style="color: #7434eb;">Forge AI</span>
              </h1>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h3 style="font-weight: 600; color: rgb(59, 59, 58); font-size: x-large;">Reset Password</h3>
            </td>
          </tr>
          <tr>
            <td align="center">
              <p style="font-weight: 600; color: rgb(59, 59, 58); text-align: center;">
                If you've lost your password or wish to reset it, <br>
                please click on the link to update your password
              </p>
            </td>
          </tr>
          <tr>
            <td align="center">
              <a href="${data.resetUrl}" style="display: inline-block; background-color: #7434eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 12px;">
                Reset your password
              </a>
            </td>
          </tr>
          <tr>
            <td align="center">
              <p style="font-weight: 500; color: rgb(59, 59, 58); margin-top: 40px; font-size: small;">
                If you did not request a password reset, you can safely ignore this email. 
                Only a person with access to your email can reset your account password.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>
    `
    const mailOptions = {
        from: `"Linked Forge AI" <${process.env.SMTP_MAIL}>`,
        to: email,
        subject,
        html
    }

    await transporter.sendMail(mailOptions)
}

export default resetPasswordMail
