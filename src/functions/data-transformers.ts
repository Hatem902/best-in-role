import { Player, User } from "@prisma/client";

export function PlayersWithVoteCounts(users: User[], players: Player[]) {
  function countVotesForPlayer(users: User[], player: Player) {
    function VotesCountForRole(roleId: keyof User) {
      return users.filter((user) => user[roleId] === player.id).length;
    }

    return {
      ...player,
      topVotesCount: VotesCountForRole("topId"),
      jglVotesCount: VotesCountForRole("jglId"),
      midVotesCount: VotesCountForRole("midId"),
      adcVotesCount: VotesCountForRole("adcId"),
      suppVotesCount: VotesCountForRole("suppId"),
    };
  }
  return players.map((player) => countVotesForPlayer(users, player));
}
