import {
  LineChart,
  LucideIcon,
  Layout,
  Brain,
  MonitorSmartphone,
  Cloud,
  Box,
  CopyPlus,
  Sparkles,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Customizable Templates",
    description:
      "Choose from a variety of modern, professionally designed templates tailored to suit your unique needs and style.",
    icon: Layout,
  },
  {
    title: "AI-Powered Content Suggestions",
    description:
      "Let our AI Writer generate compelling text suggestions, making it easier to craft engaging content for your portfolio.",
    icon: Brain,
  },
  {
    title: "Responsive Design for All Devices",
    description:
      "Ensure your portfolio looks stunning on desktops, tablets, and mobile devices with fully responsive design.",
    icon: MonitorSmartphone,
  },
  {
    title: "Portfolio Hosting with CDN",
    description:
      "Host your portfolio on a global Content Delivery Network (CDN) for lightning-fast access and a custom shareable link.",
    icon: Cloud,
  },
  {
    title: "Advanced Animations and Effects",
    description:
      "Add a professional touch with advanced animations and effects to captivate your audience.",
    icon: Sparkles,
  },
  {
    title: "3D Model Integration",
    description:
      "Integrate 3D models seamlessly into your portfolio to create an interactive and visually striking experience.",
    icon: Box,
  },
  {
    title: "Multi-Portfolio Management",
    description:
      "Create and manage multiple unique portfolios to cater to different audiences or professional needs.",
    icon: CopyPlus,
  },
  {
    title: "Real-Time Analytics and Insights",
    description:
      "Gain insights into your portfolio's performance with real-time analytics, helping you improve and reach your goals.",
    icon: LineChart,
  },
];
