/**
 * Calculate a weighted estimate for the interval until the next purchase
 * Current purchase a tiny bit less weight than all previous purchases
 * @param {Number} lastEstimate The last stored purchase interval estimate // TimeFrame
 * @param {Number} latestInterval The interval between the most recent and previous purchases
 * @param {Number} numberOfPurchases Total number of purchases for the item
 */

const calculateEstimate = (lastEstimate, latestInterval, numberOfPurchases) => {
  if (isNaN(lastEstimate)) {
    lastEstimate = 14;
  }

  if (numberOfPurchases >= 2) {
    let previousFactor = lastEstimate * numberOfPurchases;
    let latestFactor = latestInterval * (numberOfPurchases - 1);
    let totalDivisor = numberOfPurchases * 2 - 1;
    return Math.round((previousFactor + latestFactor) / totalDivisor);
  } else if (numberOfPurchases === 1) {
    return Math.round((lastEstimate + latestInterval) / 2);
  } else {
    return lastEstimate;
  }
};

export default calculateEstimate;
