type Feature = {
  label: string;
  available: boolean;
};

export type Plan = {
  subscription: string;
  price: string;
  features: Feature[];
};

export const plans: Plan[] = [
  {
    subscription: "Regular",
    price: "Free",
    features: [
      {
        label: "Access to basic templates",
        available: true,
      },
      {
        label: "AI content suggestions",
        available: true,
      },
      {
        label: "Basic customization options",
        available: true,
      },
      {
        label: "Portfolio hosting with CDN",
        available: true,
      },
      {
        label: "Advanced animations",
        available: false,
      },
      {
        label: "Modern UI design",
        available: false,
      },
      {
        label: "3D model integration",
        available: false,
      },
      {
        label: "Multi-portfolio support",
        available: false,
      },
    ],
  },
  {
    subscription: "Premium",
    price: "10$",
    features: [
      {
        label: "Access to basic templates",
        available: true,
      },
      {
        label: "AI content suggestions",
        available: true,
      },
      {
        label: "Basic customization options",
        available: true,
      },
      {
        label: "Portfolio hosting with CDN",
        available: true,
      },
      {
        label: "Advanced animations",
        available: true,
      },
      {
        label: "Modern UI design",
        available: true,
      },
      {
        label: "3D model integration",
        available: false,
      },
      {
        label: "Multi-portfolio support",
        available: false,
      },
    ],
  },
  {
    subscription: "VIP",
    price: "20$",
    features: [
      {
        label: "Access to basic templates",
        available: true,
      },
      {
        label: "AI content suggestions",
        available: true,
      },
      {
        label: "Basic customization options",
        available: true,
      },
      {
        label: "Portfolio hosting with CDN",
        available: true,
      },
      {
        label: "Advanced animations",
        available: true,
      },
      {
        label: "Modern UI design",
        available: true,
      },
      {
        label: "3D model integration",
        available: true,
      },
      {
        label: "Multi-portfolio support",
        available: true,
      },
    ],
  },
];
