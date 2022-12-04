import Player from "../../../core/models/player/player"
import PlayerDto from "../../../core/models/player/dto/player"
import IPlayerReadRepository from "../../../core/useCases/character/interfaces/IPlayerReadRepository"
import PlayerNotFoundExecption from "../../../core/exceptions/playerNotFoundExeception"

export default class inMemoryPlayerReadRepository
    implements IPlayerReadRepository
{
    private playersList: Array<PlayerDto> = []

    /**
     * Return a player by id
     * @param id player id
     * @returns {Promise<PlayerDto>}
     */
    public read(id: string): Promise<Player> {
        const player = this.playersList.find((p) => p.id === id)
        if (player) return Promise.resolve(new Player(player))
        throw new PlayerNotFoundExecption()
    }
}
