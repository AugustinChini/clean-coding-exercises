import Player from "../../../models/player/player"

export default interface IPlayerDataSource {
    read: (id: string) => Promise<Player>
}
