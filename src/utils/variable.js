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

export const feature = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512">
            <path fill="currentColor" fillRule="evenodd" d="M170.667 128.001h64v64h-64zm-42.667 64H64v85.334h64zm0 106.667H64v128h64zm106.667-85.333h-64v213.333h64zm42.666 21.333h64v64h-64zm64 85.333h-64v106.667h64zM384 149.335h64v64h-64zm64 85.333h-64v192h64zm-277.333-160h64v32h-64zM128 149.335H64v21.333h64zm149.333 21.333h64v42.667h-64zm106.667-64h64v21.333h-64z" clipRule="evenodd"/>
          </svg>,
    title: "Financial Analysis",
    description: "Deep insights into your financial statements with advanced analytics and reporting."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 14 14">
            <path fill="currentColor" fillRule="evenodd" d="M6.375 0H2.5A2.5 2.5 0 0 0 0 2.5v3.875h6.375zM0 11.5V7.625h6.375V14H2.5A2.5 2.5 0 0 1 0 11.5M7.625 14V7.625H14V11.5a2.5 2.5 0 0 1-2.5 2.5zM14 2.5v3.875H7.625V0H11.5A2.5 2.5 0 0 1 14 2.5m-11.967.225a.625.625 0 0 0 0 1.25h.625V4.6a.625.625 0 1 0 1.25 0v-.625h.625a.625.625 0 0 0 0-1.25h-.625V2.1a.625.625 0 0 0-1.25 0v.625zm6.992.625c0-.346.28-.625.625-.625h2a.625.625 0 0 1 0 1.25h-2a.625.625 0 0 1-.625-.625m.625 5.682a.625.625 0 1 0 0 1.25h2a.625.625 0 1 0 0-1.25zm-.625 2.625c0-.345.28-.625.625-.625h2a.625.625 0 1 1 0 1.25h-2a.625.625 0 0 1-.625-.625M1.781 9.215a.625.625 0 0 1 .884 0l.618.618l.618-.618a.625.625 0 1 1 .884.884l-.618.618l.618.618a.625.625 0 0 1-.884.884l-.618-.618l-.618.618a.625.625 0 0 1-.884-.884l.618-.618l-.618-.618a.625.625 0 0 1 0-.884" clipRule="evenodd"/>
          </svg>,
    title: "Budgeting & Forecasting",
    description: "Create detailed budgets and accurate forecasts with our intelligent tools."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 20 20">
            <path fill="currentColor" d="M10 2s3 2 7 2c0 11-7 14-7 14S3 15 3 4c4 0 7-2 7-2m0 8h5s1-1 1-5c0 0-5-1-6-2zH5c1 4 5 7 5 7z"/>
          </svg>,
    title: "Advanced Security",
    description: "Enterprise-grade security with end-to-end encryption and compliance."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 56 56">
            <path fill="currentColor" d="M9.625 47.71h36.75c4.898 0 7.36-2.413 7.36-7.241V15.555c0-4.828-2.462-7.266-7.36-7.266H9.625c-4.898 0-7.36 2.438-7.36 7.266v24.914c0 4.828 2.461 7.242 7.36 7.242M6.039 15.767c0-2.438 1.313-3.703 3.656-3.703h36.633c2.32 0 3.633 1.265 3.633 3.703v1.968H6.039Zm3.656 28.172c-2.344 0-3.656-1.243-3.656-3.68V23.055h43.922v17.203c0 2.437-1.313 3.68-3.633 3.68ZM12.39 37h5.743c1.383 0 2.297-.914 2.297-2.25v-4.336c0-1.312-.914-2.25-2.297-2.25H12.39c-1.383 0-2.297.938-2.297 2.25v4.336c0 1.336.914 2.25 2.297 2.25"/>
          </svg>,
    title: "Payment Processing",
    description: "Seamless integration with Stripe for secure payment processing."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17.423 16.304v3.715q0 .162.112.273q.111.112.273.112t.273-.112t.111-.273v-3.715l1.527 1.527q.112.111.264.121q.151.01.282-.121t.131-.273t-.13-.273l-1.893-1.893q-.242-.242-.565-.242q-.324 0-.566.242l-1.892 1.893q-.111.111-.121.263t.121.283t.273.13q.143 0 .273-.13zM11.887 20q-1.73-.006-3.17-.244q-1.44-.239-2.49-.66q-1.05-.423-1.639-1.01T4 16.808q0 .69.589 1.277t1.638 1.01t2.49.66q1.44.24 3.17.245m.163-5.077q-.873-.012-1.828-.085t-1.88-.262t-1.788-.476T5 13.371q.69.44 1.554.729q.863.289 1.788.476t1.88.262t1.828.085M12 8.89q2.148 0 4.33-.605q2.184-.604 2.612-1.299q-.41-.744-2.57-1.365T12 5q-2.179 0-4.366.599t-2.615 1.31q.408.733 2.576 1.357q2.169.625 4.405.625m5.808 12.725q-1.672 0-2.836-1.165q-1.164-1.164-1.164-2.835t1.164-2.836t2.836-1.164q1.67 0 2.835 1.164t1.165 2.836q0 1.67-1.165 2.835t-2.835 1.165m-6.233-2.622q.056.281.139.522q.082.24.173.484q-1.73-.006-3.17-.244q-1.44-.239-2.49-.66q-1.05-.423-1.638-1.01T4 16.808V7q0-1.246 2.34-2.123T12 4t5.66.877T20 7v4.617q-.244-.09-.484-.154q-.241-.063-.516-.119V8.275q-1.223.744-3.071 1.158T12 9.827q-2.164 0-3.992-.413Q6.178 9 5 8.275v3.987q1.179.829 3.051 1.245t3.949.416h.602q-.171.239-.303.479t-.249.521q-1.766-.004-3.708-.337Q6.4 14.252 5 13.37V17q.271.421.865.788q.594.366 1.449.619q.853.253 1.943.411t2.318.176"/>
          </svg>,
    title: "Cloud Storage",
    description: "Reliable cloud-based storage for all your financial data."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm10-9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm0 11a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"/>
        </svg>,
    title: "Intuitive Interface",
    description: "User-friendly design that makes financial management effortless."
  }
]

export const keyMetrix =  [
  {
    title: "Revenue",
    value: "$124,563.00",
    change: "+14.5%",
    isPositive: true,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M12 21.5a9.5 9.5 0 1 0 0-19a9.5 9.5 0 0 0 0 19"/><path d="M9 14.433a2.82 2.82 0 0 0 3 2.57c2.42 0 3-1.39 3-2.57s-1-2.43-3-2.43s-3-.79-3-2.4a2.75 2.75 0 0 1 3-2.6a2.89 2.89 0 0 1 3 2.6M12 18.5v-1.3m0-11.7v1.499"/></g>
          </svg>
  },
  {
    title: "Expenses",
    value: "$42,389.00",
    change: "-2.4%",
    isPositive: false,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M16.749 2h4.554l.1.014l.099.028l.06.026q.12.052.219.15l.04.044l.044.057l.054.09l.039.09l.019.064l.014.064l.009.095v4.532a.75.75 0 0 1-1.493.102l-.007-.102V4.559l-6.44 6.44a.75.75 0 0 1-.976.073L13 11L9.97 8.09l-5.69 5.689a.75.75 0 0 1-1.133-.977l.073-.084l6.22-6.22a.75.75 0 0 1 .976-.072l.084.072l3.03 2.91L19.438 3.5h-2.69a.75.75 0 0 1-.742-.648l-.007-.102a.75.75 0 0 1 .648-.743zM3.75 17a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75m5.75-3.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM13.75 15a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75m5.75-4.25a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0z"/>
          </svg>
  },
  {
    title: "Customers",
    value: "1,429",
    change: "+28.3%",
    isPositive: true,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 36"><path fill="currentColor" d="M17.9 17.3c2.7 0 4.8-2.2 4.8-4.9s-2.2-4.8-4.9-4.8S13 9.8 13 12.4c0 2.7 2.2 4.9 4.9 4.9m-.1-7.7q.15 0 0 0c1.6 0 2.9 1.3 2.9 2.9s-1.3 2.8-2.9 2.8S15 14 15 12.5c0-1.6 1.3-2.9 2.8-2.9" className="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M32.7 16.7c-1.9-1.7-4.4-2.6-7-2.5h-.8q-.3 1.2-.9 2.1c.6-.1 1.1-.1 1.7-.1c1.9-.1 3.8.5 5.3 1.6V25h2v-8z" className="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M23.4 7.8c.5-1.2 1.9-1.8 3.2-1.3c1.2.5 1.8 1.9 1.3 3.2c-.4.9-1.3 1.5-2.2 1.5c-.2 0-.5 0-.7-.1c.1.5.1 1 .1 1.4v.6c.2 0 .4.1.6.1c2.5 0 4.5-2 4.5-4.4c0-2.5-2-4.5-4.4-4.5c-1.6 0-3 .8-3.8 2.2c.5.3 1 .7 1.4 1.3" className="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="M12 16.4q-.6-.9-.9-2.1h-.8c-2.6-.1-5.1.8-7 2.4L3 17v8h2v-7.2c1.6-1.1 3.4-1.7 5.3-1.6c.6 0 1.2.1 1.7.2" className="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M10.3 13.1c.2 0 .4 0 .6-.1v-.6c0-.5 0-1 .1-1.4c-.2.1-.5.1-.7.1c-1.3 0-2.4-1.1-2.4-2.4S9 6.3 10.3 6.3c1 0 1.9.6 2.3 1.5c.4-.5 1-1 1.5-1.4c-1.3-2.1-4-2.8-6.1-1.5s-2.8 4-1.5 6.1c.8 1.3 2.2 2.1 3.8 2.1" className="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m26.1 22.7l-.2-.3c-2-2.2-4.8-3.5-7.8-3.4c-3-.1-5.9 1.2-7.9 3.4l-.2.3v7.6c0 .9.7 1.7 1.7 1.7h12.8c.9 0 1.7-.8 1.7-1.7v-7.6zm-2 7.3H12v-6.6c1.6-1.6 3.8-2.4 6.1-2.4c2.2-.1 4.4.8 6 2.4z" className="clr-i-outline clr-i-outline-path-6"/>
            <path fill="none" d="M0 0h36v36H0z"/>
          </svg>
  },
  {
    title: "Cash Flow",
    value: "$82,174.00",
    change: "+32.8%",
    isPositive: true,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
            <path fill="currentColor" fillRule="evenodd" d="M170.667 128.001h64v64h-64zm-42.667 64H64v85.334h64zm0 106.667H64v128h64zm106.667-85.333h-64v213.333h64zm42.666 21.333h64v64h-64zm64 85.333h-64v106.667h64zM384 149.335h64v64h-64zm64 85.333h-64v192h64zm-277.333-160h64v32h-64zM128 149.335H64v21.333h64zm149.333 21.333h64v42.667h-64zm106.667-64h64v21.333h-64z" clipRule="evenodd"/>
          </svg>
  }
]

export const footer = [
  {
    title: "Product",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path fill="currentColor" d="m22.509 12.689l-6-3.55a1 1 0 0 0-1.018.001l-6 3.55a1 1 0 0 0-.491.86v6.9c0 .354.187.681.491.86l6 3.55a.99.99 0 0 0 1.018 0l6-3.55a1 1 0 0 0 .491-.86v-6.9a1 1 0 0 0-.491-.861M21 19.88l-5 2.958l-5-2.958v-5.76l5-2.958l5 2.958z"/><path fill="currentColor" d="M6 20.184V11.07l6.2-3.664l-1.017-1.722l-6.692 3.955A1 1 0 0 0 4 10.5v9.684A3 3 0 0 0 2 23c0 1.654 1.346 3 3 3s3-1.346 3-3a3 3 0 0 0-2-2.816M5 24a1.001 1.001 0 0 1 0-2a1.001 1.001 0 0 1 0 2m22-4c-1.654 0-3 1.346-3 3c0 .353.072.687.185 1.002L16 28.838l-6.404-3.784l-1.017 1.722l6.912 4.084a1 1 0 0 0 1.018.001l8.96-5.295c.45.269.97.434 1.531.434c1.654 0 3-1.346 3-3s-1.346-3-3-3m0 4a1.001 1.001 0 0 1 0-2a1.001 1.001 0 0 1 0 2M16 7c.731 0 1.392-.273 1.913-.708L26 11.071V18h2v-7.5a1 1 0 0 0-.491-.861l-8.567-5.062q.056-.28.058-.577c0-1.654-1.346-3-3-3s-3 1.346-3 3s1.346 3 3 3m0-4a1.001 1.001 0 1 1-1 1c0-.552.449-1 1-1"/>
          </svg>,
    items: ["Features", "Pricing", "Security", "Enterprise"]
  },
  {
    title: "Company",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path fill="none" d="M21 18h-2v-8h-6v8h-2v-8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2Zm-4-2h-2v2h2Zm0-4h-2v2h2Z"/><path fill="currentColor" d="M16 2A11.013 11.013 0 0 0 5 13a10.9 10.9 0 0 0 2.216 6.6s.3.395.349.452L16 30l8.439-9.953c.044-.053.345-.447.345-.447l.001-.003A10.9 10.9 0 0 0 27 13A11.013 11.013 0 0 0 16 2m1 16h-2v-2h2Zm0-4h-2v-2h2Zm4 4h-2v-8h-6v8h-2v-8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2Z"/>
          </svg>,
    items: ["About", "Careers", "Blog", "Contact"]
  }
]

export const connect = [
  {
    title: 'twitter',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M15.022 3.343c.508-.087 1.077-.116 1.613-.025a4.85 4.85 0 0 1 2.54 1.273c.456.01.905-.08 1.302-.208a5.4 5.4 0 0 0 1.098-.501l.009-.006a.75.75 0 0 1 1.042 1.037c-.207.315-.496.877-.819 1.507l-.155.301c-.185.36-.375.724-.552 1.036c-.111.196-.23.395-.35.567v.274A12.34 12.34 0 0 1 8.287 21.03a12.3 12.3 0 0 1-6.694-1.97a.75.75 0 0 1 .5-1.375q.45.055.905.055a7.5 7.5 0 0 0 3.128-.696a4.86 4.86 0 0 1-2.61-2.923a.75.75 0 0 1 .147-.722l.01-.01A4.85 4.85 0 0 1 2.05 9.793V9.74a.75.75 0 0 1 .553-.724A4.84 4.84 0 0 1 2.09 6.84a4.9 4.9 0 0 1 .65-2.442a.75.75 0 0 1 1.232-.1a10.9 10.9 0 0 0 7.006 3.93a4.85 4.85 0 0 1 2.562-4.406c.402-.214.934-.385 1.482-.479m-11.28 7.548a3.35 3.35 0 0 0 2.503 2.164a.75.75 0 0 1 .072 1.453q-.409.124-.834.173a3.36 3.36 0 0 0 2.59 1.3a.75.75 0 0 1 .45 1.339a9 9 0 0 1-3.548 1.695a10.8 10.8 0 0 0 3.313.515h.009A10.84 10.84 0 0 0 19.25 8.607v-.535a.75.75 0 0 1 .186-.495c.07-.079.19-.261.36-.56c.16-.282.338-.622.523-.981l.033-.066a5 5 0 0 1-1.593.097a.75.75 0 0 1-.47-.237a3.35 3.35 0 0 0-1.904-1.032a3.4 3.4 0 0 0-1.11.025a3.6 3.6 0 0 0-1.028.323a3.35 3.35 0 0 0-1.678 3.74a.75.75 0 0 1-.767.925a12.4 12.4 0 0 1-8.149-3.627a3.4 3.4 0 0 0-.063.657v.002a3.34 3.34 0 0 0 1.486 2.785A.75.75 0 0 1 4.64 11a5 5 0 0 1-.897-.11" clipRule="evenodd"/>
          </svg>
  },
  {
    title: 'Linkedin',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-2 -2 24 24">
            <path fill="currentColor" d="M19.959 11.719v7.379h-4.278v-6.885c0-1.73-.619-2.91-2.167-2.91c-1.182 0-1.886.796-2.195 1.565c-.113.275-.142.658-.142 1.043v7.187h-4.28s.058-11.66 0-12.869h4.28v1.824l-.028.042h.028v-.042c.568-.875 1.583-2.126 3.856-2.126c2.815 0 4.926 1.84 4.926 5.792M2.421.026C.958.026 0 .986 0 2.249c0 1.235.93 2.224 2.365 2.224h.028c1.493 0 2.42-.989 2.42-2.224C4.787.986 3.887.026 2.422.026zM.254 19.098h4.278V6.229H.254z"/>
          </svg>
  },
  {
    title: 'Github',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M12 2C6.475 2 2 6.475 2 12a9.99 9.99 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10"/>
          </svg>
  }
]
