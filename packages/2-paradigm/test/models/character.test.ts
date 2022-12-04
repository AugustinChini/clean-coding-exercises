import { randomUUID } from "crypto"
import inMemoryCharacterWriteRepository from "../../app/adapters/secondary/inMemory/inMemoryCharacterWriteRepository"
import inMemoryPlayerReadRepository from "../../app/adapters/secondary/inMemory/inMemoryPlayerReadRepository"
import ICharacterWriteRepository from "../../app/core/useCases/character/interfaces/ICharacterWriteRepository"
import IPlayerReadRepository from "../../app/core/useCases/character/interfaces/IPlayerReadRepository"
import CreateCharacter from "../../app/core/useCases/character/createCharacter"
import CreateCharacterCommand from "../../app/core/useCases/character/types/createCharacterCommand"
import inMemoryCharacterReadRepository from "../../app/adapters/secondary/inMemory/inMemoryCharacterReadRepository"
import ICharacterReadRepository from "../../app/core/useCases/character/interfaces/ICharacterReadRepository"

describe("Create character", () => {
    const characterWriteRepository: ICharacterWriteRepository =
        new inMemoryCharacterWriteRepository()
    const characterReadRepository: ICharacterReadRepository =
        new inMemoryCharacterReadRepository()
    const playerReadRepository: IPlayerReadRepository =
        new inMemoryPlayerReadRepository()

    test("a new character should be level 1, rank 1 and have 12 SP, 10 HP, 0 AP, 0 DP, 0 MP", async () => {
        const characterCommand: CreateCharacterCommand = {
            playerId: randomUUID(),
            name: "Lyanna Mormont",
            healthPoints: 10,
            defensePoints: 0,
            attackPoints: 0,
            magikPoints: 0,
        }

        const createCharacterUseCase = new CreateCharacter(
            characterWriteRepository,
            playerReadRepository
        )

        const createdCharacter = await createCharacterUseCase.execute(
            characterCommand
        )

        const newCharacter = await characterReadRepository.read(
            createdCharacter.toDto().id
        )

        expect(createdCharacter).toEqual(newCharacter)
    })
})
