## Phase 4 - develop the core logic game

## Time estimate

- ~1 month (5/5/2023 - 15/6/2023)

## Status

- Doing

## Description

- List of logic game play I want implement in this phase:
  - Grid map - chessboard
  - Move the piece into chessboard
  - Take the piece off the chessboard
  - Move the piece in chessboard
  - Select piece to move in chessboard
  - Piece kill other piece on board
- Make an full demo game play
- Update logic: use an game state object to store and control piece
- The game object has the following role:
  - Store data of grid map
  - Store data of piece in map: position, is my piece or opponent piece
  - Store state of piece: in board, out board, can move, can kill, ...
  - Check turn to move: my turn or opponent turn
  - Check and notify the winner
  - ...
- During development, I realized there are some initial features were too complicated, so I decided to reduce some logic at core.
- After more than a month, almost done the core logic, I think I need rearrange the milestone ...