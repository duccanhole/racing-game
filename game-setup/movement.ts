interface IPiece {
  x: number;
  y: number;
}

export default function initMovement(scene: any, piece: IPiece) {
  scene.input.keyboard.on("keydown-UP", (_e: any) => {
    const direction = checkPosition(piece);
    movePice(piece, undefined, direction);
  });
}

function checkPosition(piece: IPiece) {
  const posX = (piece.x - 25) / 50 + 1;
  const posY = (piece.y - 25) / 50 + 1;
  console.log(posX, posY);
  if (posY === 1 && posX <= 5) return "top";
  if (posX === 6 && posY <= 6) return "right";
  if (posY === 6 && posX > 1) return "bottom";
  return "left";
}

function movePice(
  piece: IPiece,
  step: number = 1,
  direction: "top" | "right" | "left" | "bottom"
) {
  switch (direction) {
    case "top":
      piece.x += 50 * step;
      break;
    case "right":
      piece.y += 50 * step;
      break;
    case "bottom":
      piece.x -= 50 * step;
      break;
    case "left":
      piece.y -= 50 * step;
      break;
  }
}
