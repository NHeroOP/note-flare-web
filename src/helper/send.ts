import EmailTemplate, { EmailTemplatePlainText } from '@/components/EmailTemplate';
import resend from '@/lib/resend';


export default async function sendEmail(
  email: string,
  userId: string,
  verifyToken: string,
  verifyPageUrl: string,
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Notes Flare <send@email.nhero.tech>',
      to: email,
      subject: `${verifyToken} - Notes Flare Sign-in Verification`,
      react: EmailTemplate({ userId, verifyToken, url: verifyPageUrl }),
      text: await EmailTemplatePlainText({ userId, verifyToken, url: verifyPageUrl }),
    });

    if (error) {
      return {success: false, message: error.message}
    }
    
    return {success: true, message: "Verification email send successfully"}  
  } 
  catch (err) {
    console.error("Error while trying to send verification email", err)
    return {success: false, message: "Failed to send verification email"}
  }

};