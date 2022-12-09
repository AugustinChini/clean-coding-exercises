import PlayerDto from "../../../core/models/player/dto/player"
import IPlayerWriteRepository from "../../../core/useCases/character/interfaces/IPlayerWriteRepository"

export default class InMemoryPlayerWriteRepository
    implements IPlayerWriteRepository
{
    private playersList: Array<PlayerDto>

    constructor(context: Array<PlayerDto>) {
        this.playersList = context
    }

    /**
     * Create a player
     * @param player player dto
     * @returns {Promise<void>}
     */
    public create(player: PlayerDto): Promise<void> {
        this.playersList.push(player)
        return Promise.resolve()
    }
}
