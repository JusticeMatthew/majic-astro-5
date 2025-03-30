const pricingPlans = [
  {
    name: "Personal",
    recommended: false,
    blurb: "Perfect for portfolios and marketing pages",
    services: [
      "Custom designed website",
      "Personalized domain name",
      "Search engine optimization",
      "Privacy focused analytics",
      "Google Business profile",
      "Hosting & Ongoing maintenance*",
    ],
    price: "$1,000",
    monthly: "+ $0 per month",
    lottie: "animations/personalPlan.json",
  },
  {
    name: "Business",
    recommended: true,
    blurb: "Fully managed solutions for your company",
    services: [
      "Custom designed website",
      "Personalized domain name",
      "Search engine optimization",
      "Privacy focused analytics",
      "Google Business profile",
      "Company email addresses",
      "Hosting & Ongoing maintenance*",
    ],
    price: "$1,500",
    monthly: "+ $100 per month (after 12 months)",
    lottie: "animations/businessPlan.json",
  },
  {
    name: "Commerce",
    recommended: false,
    blurb: "Fast, secure online shops powered by Stripe™️",
    services: [
      "Custom designed website",
      "Personalized domain name",
      "Search engine optimization",
      "Privacy focused analytics",
      "Google Business profile",
      "Company email addresses",
      "Stripe powered online shop",
      "Hosting & Ongoing maintenance*",
    ],
    price: "$2,000",
    monthly: "+ $100 per month (after 12 months)",
    lottie: "animations/commercePlan.json",
  },
];

export default pricingPlans;
