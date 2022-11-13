import CharacterDto from "../../../models/character/dto/characterDto"

export default interface ICharacterDataSource {
    create: (characterDto: CharacterDto) => Promise<void>
    getAll: () => Promise<Array<CharacterDto>>
}
