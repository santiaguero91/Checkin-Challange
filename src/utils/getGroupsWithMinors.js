function passengersWithMinors(passengers) {
  //busca los pasajeros menor de 18 años y saca su purchaseId
  const minors = passengers.filter(passenger => passenger.age < 18);
  const purchaseIds = minors.map(minor => minor.purchaseId);
  
  //busca todos los pasajeros con los purchaseId encontrados
  const matchingPassengers = passengers.filter(passenger => purchaseIds.includes(passenger.purchaseId));

  // los ordena por su purchaseId para agruparlos
  matchingPassengers.sort(function(a, b) {
    return a.purchaseId - b.purchaseId;
  });
  return matchingPassengers;
}


function passengersWithNoMinors(passengers) {
  //busca los pasajeros menor de 18 años y saca su purchaseId
  const minors = passengers.filter(passenger => passenger.age < 18);
  const minorPurchaseIds = minors.map((minor) => minor.purchaseId);

  //cuenta cuantas veces aparece aquellos purchaseId que no pertecen a los menores
  const idCounts = {};
  passengers.forEach((passenger) => {
    if (!minorPurchaseIds.includes(passenger.purchaseId)) {
      idCounts[passenger.purchaseId] = (idCounts[passenger.purchaseId] || 0) + 1;
    }
  });

  // filtra y ordena los grupos de mayor cantidad de integrantes a menor
  return passengers
    .filter((passenger) => !minorPurchaseIds.includes(passenger.purchaseId))
    .sort((a, b) => idCounts[b.purchaseId] - idCounts[a.purchaseId]);
}


   module.exports = {passengersWithMinors, passengersWithNoMinors};