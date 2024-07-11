import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { writeFileSync } from 'fs';

export const sendEmail = async (subject, send_to, template, reply_to, cc) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      name: "maxstore website",
      link: "https://maxstore-app.vercel.app/",
    },
  });
  const emailTemplate = mailGenerator.generate(template);
  writeFileSync("preview.html", emailTemplate, "utf8");

  const noreply = "no-reply";

  //options for sending email
  const options = {
    from: `"${noreply}" <${process.env.EMAIL_USER}>`,
    to: send_to,
    replyTo: reply_to,
    subject,
    html: emailTemplate,
    cc,
  };
  //send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
