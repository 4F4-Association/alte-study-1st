class Table {
  constructor() {
    this.table = new Map();
  }
  getKey(r, c) {
    return `${r},${c}`;
  }
  get(r, c) {
    let value = this.table.get(this.getKey(r, c));
    return value ? value.split(",").map(Number) : null;
  }
  set(r1, c1, r2, c2) {
    this.table.set(this.getKey(r1, c1), this.getKey(r2, c2));
  }
  has(r, c) {
    return this.table.has(this.getKey(r, c));
  }
  update(r1, c1, r2, c2) {
    const targetKey = this.getKey(r1, c1);
    const targetValue = this.getKey(r2, c2);
    for (const [key, value] of this.table) {
      if (value === targetKey) {
        this.table.set(key, targetValue);
      }
    }
  }
  delete(r, c) {
    const target = this.getKey(r, c);
    for (const [key, value] of this.table) {
      if (value === target) {
        this.table.delete(key);
      }
    }
  }
}

function updateArr(arr, value1, value2) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === value1) arr[i][j] = value2;
    }
  }
}

function solution(commands) {
  const board = Array.from({ length: 51 }, () => Array(51).fill());
  const table = new Table();
  const result = [];

  for (const el of commands) {
    const cmd = el.split(" ");
    switch (cmd[0]) {
      case "UPDATE": {
        let [r, c, value] = cmd.slice(1);
        if (cmd.length === 4) {
          target = table.get(r, c) || [+r, +c];
          board[target[0]][target[1]] = value;
        } else {
          updateArr(board, r, c);
        }
        break;
      }
      case "MERGE": {
        const [r1, c1, r2, c2] = cmd.slice(1);
        if (
          (r1 === r2 && c1 === c2) ||
          (table.has(r1, c1) &&
            table.has(r2, c2) &&
            table.get(r1, c1).join() === table.get(r2, c2).join())
        )
          break;
        if (!table.has(r1, c1)) {
          table.set(r1, c1, r1, c1);
        }
        const [r1_i, c1_i] = table.get(r1, c1);
        if (table.has(r2, c2)) {
          const [r2_i, c2_i] = table.get(r2, c2);
          if (!board[r1_i][c1_i]) {
            board[r1_i][c1_i] = board[r2_i][c2_i];
          }
          board[r2_i][c2_i] = undefined;
          table.update(r2_i, c2_i, r1_i, c1_i);
        } else {
          if (!board[r1_i][c1_i]) {
            board[r1_i][c1_i] = board[r2][c2];
          }
          board[r2][c2] = undefined;
          table.set(r2, c2, r1_i, c1_i);
        }
        break;
      }
      case "UNMERGE": {
        let [r, c] = cmd.slice(1).map(Number);
        const flag = table.get(r, c);
        if (flag) {
          const [x, y] = flag;
          if (!(r === x && c === y)) {
            board[r][c] = board[x][y];
            board[x][y] = undefined;
          }
          table.delete(x, y);
        }
        break;
      }
      case "PRINT": {
        let [r, c] = cmd.slice(1).map(Number);
        const target = table.get(r, c) || [r, c];
        result.push(board[target[0]][target[1]] || "EMPTY");
        break;
      }
    }
  }
  return result;
}
