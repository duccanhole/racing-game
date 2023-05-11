interface IPiece {
  x: number;
  y: number;
}

export default function initMovement(scene: any, piece: IPiece) {
  scene.input.keyboard.on("keydown-UP", (_e: any) => {
    const direction = checkPosition(piece);
    movePice(piece, direction);
  });
}

function checkPosition(piece: IPiece) {
  const posX = (piece.x - 25) / 50 + 1;
  const posY = (piece.y - 25) / 50 + 1;
  switch (true) {
    case posX <= 5 && posY === 1:
      return "top";
    case posX === 6 && posY >= 1 && posY <= 5:
      return "right";
    case posX > 1 && posX <= 6 && posY === 6:
      return "bottom";
    case posX === 1 && posY >= 2 && posY <= 6:
      return "left";
    default:
      return "top";
  }
}

function movePice(
  piece: IPiece,
  direction: "top" | "right" | "left" | "bottom"
) {
  switch (direction) {
    case "top":
      piece.x += 50;
      break;
    case "right":
      piece.y += 50;
      break;
    case "bottom":
      piece.x -= 50;
      break;
    case "left":
      piece.y -= 50;
      break;
  }
}
