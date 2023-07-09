const { PrismaClient } = require("@prisma/client");
const arrageData = require("../utils/arrageData");
const {passengersWithMinors, passengersWithNoMinors} = require("../utils/getGroupsWithMinors");
const changeSeatsOrder = require("../utils/changeSeatsOrder");
const assignSeats = require("../utils/assignSeats");
const prisma = new PrismaClient();


const checkInController = async (req, res) => {
  const { id } = req.params;
  const flightId = parseInt(id);

  try {
    if (flightId !== 1 && flightId !== 2 && flightId !== 3 && flightId !== 4) {
      return res.status(404).json({
        code: 404,
        data: {},
      });
    }

//? //// Obtengo informacion del vuelo, de los pasajeros y de los asientos relacionados al vuelo.

    //Obtengo la data del vuelo por el ID de la URL
    const flight =  await prisma.flight.findUnique({
      where: { flight_id: flightId },
    });

    const seats =  await prisma.seat.findMany(
      {where: { airplane_id: flight.airplane_id} //Obtengo los seats del avion indicado
    });

    //Obtengo los datos del BoardingPass en relacion al Id del vuelo
    const boarding_passesWithPassengerData = await prisma.boarding_pass.findMany(
      {where: { flight_id: flightId },
      include: { passenger: true }   // y los pasageros anexados a dicho pasaje
    });
    let passengerWithPases= arrageData(boarding_passesWithPassengerData)
    
//? //////////////////////////////////////////////////////////////////////////////
const passengerWithMinors =  passengersWithMinors(passengerWithPases) 
const passengerWithNoMinors =  passengersWithNoMinors(passengerWithPases) 
const seatsInRows = await changeSeatsOrder(seats); 

//? //////////////////////Asign seats////////////////////////////////////////////////////////

const passengersWithSeatsAsigned = await assignSeats(seatsInRows,passengerWithMinors,passengerWithNoMinors);

return res.json({
  code: 200,
  data: {
    flightId: flight.flight_id,
    takeoffDateTime: flight.takeoff_date_time,
    takeoffAirport: flight.takeoff_airport,
    landingDateTime: flight.landing_date_time,
    landingAirport: flight.landing_airport,
    airplaneId: flight.airplane_id,
    passengers: passengersWithSeatsAsigned,
  },
});
  } catch (error) {
    console.error(error);
    if (error.message === "flight not found") {
      return res.status(404).json({
        code: 404,
        data: {},
      });
    }
    return res.status(400).json({
      code: 400,
      errors: "could not connect to db",
    });
  }
};

module.exports = checkInController;
