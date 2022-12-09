import CharacterDto from "../../../core/models/character/dto/characterDto"
import ICharacterWriteRepository from "../../../core/useCases/character/interfaces/ICharacterWriteRepository"

export default class InMemoryCharacterWriteRepository
    implements ICharacterWriteRepository
{
    private charactersList: Array<CharacterDto>

    constructor(context: Array<CharacterDto>) {
        this.charactersList = context
    }

    /**
     * Create a new caracter
     * @param characterDto New character
     * @returns {Promise<void>}
     */
    public create(characterDto: CharacterDto): Promise<void> {
        this.charactersList.push(characterDto)
        return Promise.resolve()
    }
}
