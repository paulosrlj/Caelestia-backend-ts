import { Player } from '@prisma/client';

function playerPresentation({
  id,
  email,
  name,
  nickname,
  totalPoints,
  coins,
  level,
}: Player) {
  return {
    id,
    email,
    name,
    nickname,
    totalPoints,
    coins,
    level,
  };
}

export default playerPresentation;
