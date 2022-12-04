import CharacterNotFoundExecption from "../../../core/exceptions/characterNotFoundExeception"
import Character from "../../../core/models/character/character"
import CharacterDto from "../../../core/models/character/dto/characterDto"
import ICharacterReadRepository from "../../../core/useCases/character/interfaces/ICharacterReadRepository"

export default class inMemoryCharacterReadRepository
    implements ICharacterReadRepository
{
    private charactersList: Array<CharacterDto> = []

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
