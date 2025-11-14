import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Gmail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,  // your Gmail
      pass: process.env.GMAIL_PASS           // Gmail App Password
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,   // must match transporter.user
    to: process.env.GMAIL_USER,     // your email to receive
    replyTo: email,                       // user's email (optional)
    subject: `Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: "success", message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to send email." });
  }
}


