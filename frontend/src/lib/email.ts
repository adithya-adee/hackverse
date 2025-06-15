import emailjs from "@emailjs/browser";

if (
  !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
  !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
  !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
) {
  console.error("Missing EmailJS configuration");
}

export const sendContactEmail = async (templateParams: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        to_email: "adithya25905@gmail.com",
        from_name: templateParams.name,
        from_email: templateParams.email,
        subject: templateParams.subject,
        message: templateParams.message,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
