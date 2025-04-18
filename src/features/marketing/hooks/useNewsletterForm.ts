import { useRef, useState } from "react";
import { toast } from "sonner";

export default function useNewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const getSubscribed = ({ email }: { email: string }) => {
    return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 24px; text-align: center; border: 1px solid #e9ecef;">
        <h2 style="color: #1a73e8; margin-bottom: 16px; font-size: 24px;">Thank you for subscribing to our newsletter!</h2>
        <p style="color: #5f6368; margin-bottom: 16px; font-size: 16px;">We're excited to have you join our community.</p>
        <div style="background-color: #ffffff; border-radius: 4px; padding: 12px; border: 1px solid #e9ecef;">
          <p style="color: #3c4043; margin: 0;">Subscriber Email: ${email}</p>
        </div>
        <p style="color: #5f6368; margin-top: 16px; font-size: 14px;">Powered by Portforyou</p>
      </div>
    </div>
    `;
  };

  const sendMail = async (e: React.FormEvent, clientEmail: string) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.current?.email?.value) {
      toast.error("Please Enter Your Email", {
        id: "newsletter_empty_email",
      });
      setIsLoading(false);
      return;
    } 
    
    if (!regex.test(form.current.email.value)) {
      toast.error("Please Enter a Valid Email", {
        id: "newsletter_invalid_email",
      });
      setIsLoading(false);
      return;
    }

    const subscribed = getSubscribed({
      email: form.current.email.value,
    });

    try {
      const res = await fetch("https://sendmail-api-docs.vercel.app/api/send", {
        method: "POST",
        body: JSON.stringify({
          to: clientEmail,
          subject: "Subscription Request",
          message: subscribed,
        }),
      });
      
      const data = await res.json();

      if (data?.success) {
        toast.success("Thank You for Subscribing 🎉", {
          id: "subscripion_success",
        });
        form.current.reset();
        window.scrollTo({
          top: 0,
        });
      } else {
        toast.error("Something Went Wrong Please Retry Again !", {
          id: "newsletter_fail_subscription",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong Please Retry Again !", {
        id: "newsletter_fail_subscription",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMail, isLoading, form };
}