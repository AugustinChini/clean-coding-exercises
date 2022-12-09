import CharacterLimitException from "../../exceptions/characterLimitException"
import CharacterNameAlreadyExistException from "../../exceptions/characterNameAlreadyExistException"
import Character from "../character/character"
import PlayerDto from "./dto/player"

export default class Player {
    private id: string
    private characters: Array<Character>

    public constructor(player: PlayerDto) {
        this.id = player.id
        this.characters = player.characters.map((cDto) => new Character(cDto))
    }

    /**
     * canCreateCharacter Check if it's possible to create a new character
     */
    public canCreateCharacter(newCharacter: Character): void {
        // check if there is less than 10 characters
        if (this.characters.length >= 10) {
            throw new CharacterLimitException()
        } else if (
            this.characters.find(
                (c) => c.toDto().name === newCharacter.toDto().name
            )
        ) {
            // check if the name already exist
            throw new CharacterNameAlreadyExistException()
        }
    }

    toDto(): PlayerDto {
        return {
            id: this.id,
            characters: this.characters.map((c) => c.toDto()),
        }
    }
}
