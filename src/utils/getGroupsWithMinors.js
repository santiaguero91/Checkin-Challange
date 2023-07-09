

function passengersWithMinors(passengers) {
  const minors = passengers.filter(passenger => passenger.age < 18);
  const purchaseIds = minors.map(minor => minor.purchaseId);
  const matchingPassengers = passengers.filter(passenger => purchaseIds.includes(passenger.purchaseId));
  matchingPassengers.sort(function(a, b) {
    return a.purchaseId - b.purchaseId;
  });
  return matchingPassengers;
}

function passengersWithNoMinors(passengers) {
  const minors = passengers.filter(passenger => passenger.age < 18);
  const minorPurchaseIds = minors.map((minor) => minor.purchaseId);
  const idCounts = {};
  passengers.forEach((passenger) => {
    if (!minorPurchaseIds.includes(passenger.purchaseId)) {
      idCounts[passenger.purchaseId] = (idCounts[passenger.purchaseId] || 0) + 1;
    }
  });

  return passengers
    .filter((passenger) => !minorPurchaseIds.includes(passenger.purchaseId))
    .sort((a, b) => idCounts[b.purchaseId] - idCounts[a.purchaseId]);
}


   module.exports = {passengersWithMinors, passengersWithNoMinors};