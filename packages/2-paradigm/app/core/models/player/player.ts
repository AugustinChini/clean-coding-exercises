import Character from "../character/character"
import PlayerDto from "./dto/player"

export default class Player {
    private id: string
    private characters: Array<Character>

    public constructor(id: string, characters: Array<Character>) {
        this.id = id
        this.characters = characters
    }

    toDto(): PlayerDto {
        return {
            id: this.id,
            characters: this.characters.map((c) => c.toDto()),
        }
    }
}
