import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
});
export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.MY_EMAIL,
    to,
    subject,
    text,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (err) {
    console.log(err);
    console.log("Error while sending email");
  }
};
