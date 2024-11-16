const pricingPlans = [
  {
    name: "Personal",
    recommended: false,
    blurb: "Perfect for portfolios and marketing pages",
    services: [
      "Custom designed website",
      "Personalized domain",
      "Search engine optimization",
      "Google Business listing",
      "Secure hosting & maintenance",
    ],
    price: "$1,000",
    monthly: "+ $0 per month",
    lottie: "animations/personalPlan.json",
  },
  {
    name: "Business",
    recommended: true,
    blurb: "Fully managed online solutions for your business",
    services: [
      "Custom designed website",
      "Personalized domain",
      "Search engine optimization",
      "Google Business listing",
      "Secure hosting & maintenance",
      "Company email addresses",
    ],
    price: "$1,500",
    monthly: "+ $100 per month",
    lottie: "animations/businessPlan.json",
  },
  {
    name: "Commerce",
    recommended: false,
    blurb: "Fast, secure online shops powered by Stripe™️",
    services: [
      "Custom designed website",
      "Personalized domain",
      "Search engine optimization",
      "Google Business listing",
      "Secure hosting & maintenance",
      "Company email addresses",
      "Modern e-commerce platform",
    ],
    price: "$2,000",
    monthly: "+ $100 per month",
    lottie: "animations/commercePlan.json",
  },
];

export default pricingPlans;
