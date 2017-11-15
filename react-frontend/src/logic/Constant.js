const gameStatus = {
  init : 0,
  running : 1,
  success : 2,
  failed : 3,
  pause : 4,
}

const direction = {
  up : 0,
  right : 1,
  down : 2,
  left : 3,
}

const defaultState = {
  board : {
    map : [[0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0]],
    torchPos : { x : -1, y : -1},
    bombPos : { x : -1, y : -1},
    bombArea : [],
  },
  character : {
    pos : { x : 4, y : 4},
    dir : 2,
    items : {
      torchNum : 0,
      bombNum : 0,
    },
  },
  enemy : [
    {
      pos : { x : 1, y : 1},
      dir : 2,
      status : 'alive',
      turningPoint : [
        {
          pos : { x : 2, y : 1},
          dir : 1,
        },
        {
          pos : { x : 2, y : 2},
          dir : 0,
        },
        {
          pos : { x : 1, y : 2},
          dir : 3,
        },
        {
          pos : { x : 1, y : 1},
          dir : 2,
        },
      ]
    },
  ],
}

const actionTable = {
  go : '1',
  turnLeft : '2',
  turnRight : '3',
  attack : '4',
  torch : '5',
  bomb : '6',
  open : '7',
}

const elements = {
  empty : 0,
  chest : 90,
  enemy : 91,
  grass : 92,
  tree : 93,
  fence : 94,
  stone : 95,
  precipice: 96,
  pond: 97,
}

export { gameStatus, direction, defaultState, actionTable, elements };
