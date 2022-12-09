import PlayerDto from "../../../models/player/dto/player"

export default interface IPlayerWriteRepository {
    create: (player: PlayerDto) => Promise<void>
}
