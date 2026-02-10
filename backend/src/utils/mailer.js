import nodemailer from "nodemailer"
import dotenv from "dotenv"


dotenv.config();

export const transpoter = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS 
    }
});

export const sendEmail = async({to, subject, html})=>{

    await transpoter.sendMail({
        from: `"Supprt Team" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    })
}

// export const sendContactInformationEmail = async({name,email,subject})=>{
//     const mailOption = {
//         from: `Supprt Team <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "We Receive yor message",
//         html:`
//                 <div style="font-family: Arial, sans-serif;">
//                     <h2>Hello ${name},</h2>
//                     <p>Thank you for contacting us.</p>
//                     <p><strong>Subject:</strong> ${subject}</p>
//                     <p>We have received your message and will get back to you shortly.</p>
//                     <br/>
//                     <p>Regards,<br/><strong>Support Team</strong></p>
//                 </div>  
//             `
//     }
//     return transpoter.sendMail(mailOption);
// }



