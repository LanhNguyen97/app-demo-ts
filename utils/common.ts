/* eslint-disable radix */
export const numberWithCommasAndCurrency = (
    x: string | number,
    currency = "đ"
): string => {
    return `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${currency}`;
};

export const getPromotionalPrice = (
    originalPrice: string,
    discount: string
) => {
    return numberWithCommasAndCurrency(
        (parseInt(originalPrice) * parseInt(discount)) / 100
    );
};
