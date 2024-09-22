export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export const formatPosNegativeCurrency = (amount: number): string => {
    // Format the number to a currency string without the currency symbol
    const options: Intl.NumberFormatOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    // Get the absolute value formatted as a string
    const formattedAmount = Math.abs(amount).toLocaleString(undefined, options);

    // If the amount is negative, prepend a minus sign
    return amount < 0 ? `-$${formattedAmount}` : `$${formattedAmount}`;
};
