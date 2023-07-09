function arrageData(boarding_passesWithPassengerData) {
    const passengers = boarding_passesWithPassengerData.map(pass => {
        return {
        passengerId : pass.passenger.passenger_id,
        dni : pass.passenger.dni, 
        name : pass.passenger.name,
        age : pass.passenger.age,
        country : pass.passenger.country,
        boardingPassId: pass.boarding_pass_id,
        purchaseId : pass.purchase_id,
        seatTypeId : pass.seat_type_id,
        seatId : pass.seat_id
    };
    })
    return passengers
    
    }
    module.exports = arrageData;