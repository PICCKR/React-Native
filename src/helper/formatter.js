

// Function to customize the currency symbol
export const formatAmount = (amount) => {
 return formatter.formatToParts(amount).map(part => {
  if (part.type === 'currency') {
   // Replace the default currency code 'NGN' with '₦'
   return '₦';
  }
  return part.value;
 }).join('');
};

export const formatter = new Intl.NumberFormat('en-US', {
 style: 'currency',
 currency: 'NGN'
})
