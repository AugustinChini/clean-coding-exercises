import CharacterDto from "../../character/dto/characterDto"

export default class PlayerDto {
    readonly id: string
    readonly characters: Array<CharacterDto>

    constructor(id: string, characters: Array<CharacterDto>) {
        this.id = id
        this.characters = characters
    }
}
