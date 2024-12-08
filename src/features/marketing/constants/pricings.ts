type Feature = {
  label: string;
  available: boolean;
  id: number;
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
        id: 1,
        label: "Access to basic templates",
        available: true,
      },
      {
        id: 2,
        label: "AI content suggestions",
        available: true,
      },
      {
        id: 3,
        label: "Basic customization options",
        available: true,
      },
      {
        id: 4,
        label: "Portfolio hosting with CDN",
        available: true,
      },
      {
        id: 5,
        label: "Advanced animations",
        available: false,
      },
      {
        id: 6,
        label: "Modern UI design",
        available: false,
      },
      {
        id: 7,
        label: "3D model integration",
        available: false,
      },
      {
        id: 8,
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
        id: 9,
        label: "Access to basic templates",
        available: true,
      },
      {
        id: 10,
        label: "AI content suggestions",
        available: true,
      },
      {
        id: 11,
        label: "Basic customization options",
        available: true,
      },
      {
        id: 12,
        label: "Portfolio hosting with CDN",
        available: true,
      },
      {
        id: 13,
        label: "Advanced animations",
        available: true,
      },
      {
        id: 14,
        label: "Modern UI design",
        available: true,
      },
      {
        id: 15,
        label: "3D model integration",
        available: false,
      },
      {
        id: 16,
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
        id: 17,
        label: "Access to basic templates",
        available: true,
      },
      {
        id: 18,
        label: "AI content suggestions",
        available: true,
      },
      {
        id: 19,
        label: "Basic customization options",
        available: true,
      },
      {
        id: 20,
        label: "Portfolio hosting with CDN",
        available: true,
      },
      {
        id: 21,
        label: "Advanced animations",
        available: true,
      },
      {
        id: 22,
        label: "Modern UI design",
        available: true,
      },
      {
        id: 23,
        label: "3D model integration",
        available: true,
      },
      {
        id: 24,
        label: "Multi-portfolio support",
        available: true,
      },
    ],
  },
];
