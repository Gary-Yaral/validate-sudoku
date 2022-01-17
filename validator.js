let rows = [
  ["3","8","1","5","7","2","4","6","9"],
  ["2","9","4","1","6","3","5","7","8"],
  ["5","7","6","8","4","9","2","3","1"],
  ["7","6","8","2","5","1","9","4","3"],
  ["9","2","5","4","3","7","1","8","6"],
  ["1","4","3","9","8","6","7","5","2"],
  ["6","3","2","7","9","5","8","1","4"],
  ["4","5","9","6","1","8","3","2","7"],
  ["8","1","7","3","2","4","6","9","5"]
]

function getColumns(matrix, x = 0, y = 9){ 
  let columns = []
  for(let i = x; i < y; i++) {
     let array = [];
    for(let j = x; j < y; j++) {
      array.push(matrix[j][i])
    }

    columns.push(array);

   }

  return columns;
}

function removeEmpties(matrix) {
  return matrix.map(row => {
    return row.filter(x => x !== ".")
  })
}

function verifyRepeated(matrix) {
  let cleanedMatrix = removeEmpties(matrix)
  let array = cleanedMatrix.map((row,index)=> {
    let length = [...new Set(row)].length;
    if(row.length !== length) {
      return {index, repeat: true}
    }
    return {index, repeat: false}
  })

  return array.filter(r => r.repeat === true);

}

function getBlock(matrix, x, y, limit) {
  let block = [];
  for(x ; x < y; x++){      
    let data = [];
    for(let y = limit * 3; y < (3 + (limit * 3)); y++) {      
      data.push(matrix[x][y])
    }

    block.push(...data);
  }

  return block;

}

function getAllBlocks(matrix) {
  let blocks= [];
  let counter = 0;
  let row = 0;
  while(row < 3) {
    let x = row * 3;
    let y = (row * 3) + 3;
    blocks.push(getBlock(matrix,x,y,counter))
      
    row++;

    if(row === 3){
      counter++;
      row = 0;
    }

    if (counter === 3) {
      row = 4;
    }
  }

  return blocks;

}

function validateSudoku(array) {
  let columns = verifyRepeated(getColumns(array));
  let rows = verifyRepeated(array);
  let blocks = verifyRepeated(getAllBlocks(array));
  let isValid = false;
  let getErrors = {};
  if(columns.length === 0 && rows.length === 0 && blocks.length === 0) {
    isValid = true;
  }

  if(columns.length > 0) getErrors.columns = columns;
  if(rows.length > 0) getErrors.rows = rows;
  if(blocks.length > 0) getErrors.blocks = blocks;
  
  return {
    validate: {
      isValid,
      getErrors: Object.keys(getErrors).length > 0 ? getErrors : false
    }  
  }
}

let sudoku = validateSudoku(rows)

console.log(sudoku.validate)
