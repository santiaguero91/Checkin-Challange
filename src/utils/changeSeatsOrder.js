  const changeSeatsOrder = async (allSeats) => {

    // Ordena los asientos en base a su seat_row
    allSeats.sort(function(a, b) {
      return a.seat_row - b.seat_row;
    });
  
    // Arma varios grupos en base a su seat_row
    const seatGroups = {};
    let currentRow = allSeats[0].seat_row;
    let currentGroup = [];

    for(let i = 0; i < allSeats.length; i++) {
      if(allSeats[i].seat_row !== currentRow) {
      // Al cambiar la fila , añade el grupo que tiene y lo invierte
        seatGroups[currentRow] = currentGroup;
        currentGroup = currentGroup.reverse();
        // Comienza un nuevo grupo en la siguiente fila
        currentGroup = [...currentGroup, allSeats[i]];
        currentRow = allSeats[i].seat_row;
      } else {
        currentGroup = [...currentGroup, allSeats[i]];
      }
    }
    // añade el ultimo grupo y los devuelve como un solo array
    seatGroups[currentRow] = currentGroup.reverse();
        const result = [];
    for (const row in seatGroups) {
      result.push(...seatGroups[row]);
    }
    
    return result;
  }
  module.exports = changeSeatsOrder;
