import { Platform } from 'react-native'

// Function to customize the currency symbol
export const formatAmount = (amount) => {
 if (Platform.OS === "android") {
  return formatter.formatToParts(amount).map(part => {
   if (part.type === 'currency') {
    // Replace the default currency code 'NGN' with '₦'
    return '₦';
   }
   return part.value;
  }).join('');
 } else {
  return formatter.format(amount)
 }

};

export const formatter = new Intl.NumberFormat('en-US', {
 style: 'currency',
 currency: 'NGN'
})
