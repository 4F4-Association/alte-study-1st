function solution(board, skill) {
  const newBoard = Array.from(Array(board.length + 1), () =>
    Array(board[0].length + 1).fill(0)
  );
  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    if (type === 2) degree = -degree;
    newBoard[r1][c1] -= degree;
    newBoard[r2 + 1][c1] += degree;
    newBoard[r1][c2 + 1] += degree;
    newBoard[r2 + 1][c2 + 1] -= degree;
  });
  for (let i = 0; i < newBoard.length; i++) {
    for (let j = 1; j < newBoard[0].length; j++) {
      newBoard[i][j] += newBoard[i][j - 1];
    }
  }
  for (let i = 0; i < newBoard[0].length; i++) {
    for (let j = 1; j < newBoard.length; j++) {
      newBoard[j][i] += newBoard[j - 1][i];
    }
  }
  return board.reduce(
    (acc, cur, i1) =>
      acc +
      cur.reduce(
        (acc2, cur2, i2) => (cur2 + newBoard[i1][i2] > 0 ? acc2 + 1 : acc2),
        0
      ),
    0
  );
}
