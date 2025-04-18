import { useState } from "react";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface UseContactFormProps {
  clientEmail: string | undefined;
}

export const useContactForm = ({ clientEmail }: UseContactFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientEmail) {
      toast.error("Unable to send message at this time");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("https://sendmail-api-docs.vercel.app/api/send", {
        method: "POST",
        body: JSON.stringify({
          to: clientEmail,
          subject: formData.subject,
          message: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 24px; text-align: left; border: 1px solid #e9ecef;">
                <h2 style="color: #1a73e8; margin-bottom: 16px; font-size: 24px;">New Contact Form Submission</h2>
                <div style="background-color: #ffffff; border-radius: 4px; padding: 16px; border: 1px solid #e9ecef; margin-bottom: 12px;">
                  <p style="color: #3c4043; margin: 8px 0;"><strong>Name:</strong> ${formData.name}</p>
                  <p style="color: #3c4043; margin: 8px 0;"><strong>Email:</strong> ${formData.email}</p>
                  <p style="color: #3c4043; margin: 8px 0;"><strong>Message:</strong><br/>${formData.message}</p>
                </div>
                <p style="color: #5f6368; margin-top: 16px; font-size: 14px; text-align: center;">Sent via Arik Template - Powered by Portforyou</p>
              </div>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
