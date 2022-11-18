import CharacterNotFoundExecption from "packages/2-paradigm/app/core/exceptions/characterNotFoundExeception"
import Character from "../../../core/models/character/character"
import CharacterDto from "../../../core/models/character/dto/characterDto"
import ICharacterDataSource from "../../../core/useCases/character/interfaces/ICharacterDataSource"

export default class InMemoryCharacterDataSource
    implements ICharacterDataSource
{
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
     * Get a caracter by id
     * @param id character id
     * @returns {Promise<void>}
     */
    public read(id: string): Promise<Character> {
        const character = this.charactersList.find((c) => c.id === id)
        if (character) return Promise.resolve(new Character(character))
        throw new CharacterNotFoundExecption()
    }
}
