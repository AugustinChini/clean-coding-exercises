import CharacterDto from "../../../core/models/character/dto/characterDto"
import ICharacterDataSource from "../../../core/useCases/character/interfaces/ICharacterDataSource"

export default class CharacterDataSource implements ICharacterDataSource {
    private charactersList: Array<CharacterDto> = []

    /**
     * Create a new caracter
     * @param characterDto New character
     * @returns {Promise<void>}
     */
    public create(characterDto: CharacterDto): Promise<void> {
        this.charactersList.push(characterDto)
        return Promise.resolve()
    }

    /**
     * getAll Get all the charcters
     */
    public getAll(): Promise<Array<CharacterDto>> {
        return Promise.resolve(this.charactersList)
    }
}
