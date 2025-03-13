export const standardCOA = [
    "Revenues",	"COGS/S&O",	"SGA",	"Depreciation & Amortization",	"Cash & Equivalents", 	
    "Current Assets",	"Long Term Assets",	"Current Liabilities",	"Long Term Liabilities", 	
    "Equity"
]

export const allFeatures = [
  "Basic Reports", "Limited Transactions", "Community Support",
  "Full Reports", "Unlimited Transactions", "Email Support",
  "Advanced Analytics", "Priority Support", "Multi-User Access"
]

export const plans = [
  { title: "Free Trial Plan",  price: "$0/month",  stripePriceId: "price_1R0Xe902EF3FQcIQvGKOMZ9S", features: ["Basic Reports", "Limited Transactions", "Community Support"] },
  { title: "Single Member", price: "$10/month", stripePriceId: "price_1R1clP02EF3FQcIQYmFj9rxn", features: ["Community Support", "Full Reports", "Unlimited Transactions", "Email Support"] },
  { title: "Enterprise Plan",   price: "$50/month", stripePriceId: "price_1R0XeD02EF3FQcIQDMxYwv7D", features: ["Community Support", "Full Reports", "Unlimited Transactions", "Email Support", "Advanced Analytics", "Priority Support", "Multi-User Access"] },
];

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};