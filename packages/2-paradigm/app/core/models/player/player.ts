import Character from "../character/character"
import PlayerDto from "./dto/player"

export default class Player {
    private id: string
    private characters: Array<Character>

    public constructor(player: PlayerDto) {
        this.id = player.id
        this.characters = player.characters.map((cDto) => new Character(cDto))
    }

    toDto(): PlayerDto {
        return {
            id: this.id,
            characters: this.characters.map((c) => c.toDto()),
        }
    }
}
