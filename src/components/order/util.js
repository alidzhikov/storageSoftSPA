const getOrderSum = (order) => {
    let orderSum = 0;
    order.orderProducts.forEach(oPr => orderSum += oPr.qty * oPr.price);
    return roundToTwo(orderSum);
};

const getVatSum = (orderSum) => {
    return Math.round(orderSum * 120) / 100;
};

const getSoldAmount = (order) => {
    let orderSoldAmount = 0;
    order.orderProducts.forEach(oPr => orderSoldAmount += oPr.qty );
    return orderSoldAmount;
};

const roundToTwo = (number) => {
    return Math.round(number * 100) / 100
};

const roundToTwoString = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2)
};

module.exports = {
    getVatSum: getVatSum,
    getOrderSum: getOrderSum,
    getSoldAmount: getSoldAmount,
    roundToTwo: roundToTwo,
    roundToTwoString: roundToTwoString
}