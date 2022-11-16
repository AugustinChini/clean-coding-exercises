import Player from "../../../core/models/player/player"
import PlayerDto from "../../../core/models/player/dto/player"
import IPlayerDataSource from "../../../core/useCases/character/interfaces/IPlayerDataSource"
import PlayerNotFoundExecption from "../../../core/exceptions/playerNotFoundExeception"

export default class InMemoryPlayerDataSource implements IPlayerDataSource {
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
