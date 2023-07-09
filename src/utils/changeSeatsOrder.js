  const changeSeatsOrder = async (allSeats) => {

    // Sort the seats array by seat_row
    allSeats.sort(function(a, b) {
      return a.seat_row - b.seat_row;
    });
  
    // Group the seats by seat_row
    const seatGroups = {};
    let currentRow = allSeats[0].seat_row;
    let currentGroup = [];
  
    for(let i = 0; i < allSeats.length; i++) {
      if(allSeats[i].seat_row !== currentRow) {
        // Change in row, add current group to seatGroups
        seatGroups[currentRow] = currentGroup;
        // Reverse current group
        currentGroup = currentGroup.reverse();
        // Start new group for next row
        currentGroup = [...currentGroup, allSeats[i]];
        currentRow = allSeats[i].seat_row;
      } else {
        currentGroup = [...currentGroup, allSeats[i]];
      }
    }
    
    // Add the last group to seatGroups
    seatGroups[currentRow] = currentGroup.reverse();
    
    // Create a single array with all seats in increasing row order
    const result = [];
    for (const row in seatGroups) {
      result.push(...seatGroups[row]);
    }
    
    return result;
  }
  module.exports = changeSeatsOrder;
