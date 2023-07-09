function assignSeats(allSeats,GroupswithMinorsByPurchaseID,getGroupsWithNoMinors) {  
  let availableSeats = [...allSeats];
  let seatMapping = {};

  for (let i = 0; i < GroupswithMinorsByPurchaseID.length; i++) {
    const passenger = GroupswithMinorsByPurchaseID[i];
    const seatType = passenger.seatTypeId;
    const availableSeat = availableSeats.find((seat) => seat.seat_type_id === seatType);
    
    if (availableSeat) {
      passenger.seatId = availableSeat.seat_id;
      if (!seatMapping[seatType]) {
        seatMapping[seatType] = [];
      }
      seatMapping[seatType].push(availableSeat.seat_id);
      availableSeats = availableSeats.filter(
        (seat) => seat.seat_id !== availableSeat.seat_id
      );
    }
  }

  const boardingPassCount = {};

  for (const passenger of getGroupsWithNoMinors) {
    const boardingPassId = passenger.boarding_pass_id;
    if (boardingPassCount[boardingPassId]) {
      boardingPassCount[boardingPassId]++;
    } else {
      boardingPassCount[boardingPassId] = 1;
    }
  }

  getGroupsWithNoMinors.sort((a, b) => {
    const countA = boardingPassCount[a.boarding_pass_id];
    const countB = boardingPassCount[b.boarding_pass_id];
    return countB - countA;
  });

  for (const passenger of getGroupsWithNoMinors) {
    const seatType = passenger.seatTypeId;
    const availableSeat = availableSeats.find(
      (seat) => seat.seat_type_id === seatType
    );

    if (availableSeat) {
      passenger.seatId = availableSeat.seat_id;
      const purchaseId = passenger.purchaseId;
      const passengersWithSamePurchaseId = getGroupsWithNoMinors.filter(
        (p) => p.purchaseId === purchaseId
      );
      if (passengersWithSamePurchaseId.length > 0) {
        const referencePassenger = passengersWithSamePurchaseId[0];
      }
      availableSeats = availableSeats.filter(
        (seat) => seat.seat_id !== availableSeat.seat_id
      );
    }
  }
  const combinedArray = GroupswithMinorsByPurchaseID.concat(
    getGroupsWithNoMinors
  );

  return combinedArray;
}

module.exports = assignSeats;
