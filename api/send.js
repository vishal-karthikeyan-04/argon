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
      user: "vishallegionpro@gmail.com",  // your Gmail
      pass: "jydxgansunnrvazx"           // Gmail App Password
    }
  });

  const mailOptions = {
    from: "vishallegionpro@gmail.com",   // must match transporter.user
    to: "vishallegionpro@gmail.com",     // your email to receive
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
