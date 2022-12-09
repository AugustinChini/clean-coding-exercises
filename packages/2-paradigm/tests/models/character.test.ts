import crypto from "crypto"
import CreateCharacter from "../../app/core/useCases/character/createCharacter"
import CreateCharacterCommand from "../../app/core/useCases/character/types/createCharacterCommand"
import PlayerDto from "../../app/core/models/player/dto/player"
import InMemoryUnitOfWork from "../../app/adapters/secondary/inMemory/inMemoryUnitOfWork"

describe("Create character", () => {
    const unitOfWork: InMemoryUnitOfWork = new InMemoryUnitOfWork()
    const playerDto: PlayerDto = {
        id: crypto.randomUUID(),
        characters: [],
    }

    beforeEach(() => {
        unitOfWork.getPlayerWriteRepository().create(playerDto)
    })

    test("a new character should be level 1, rank 1 and have 12 SP, 10 HP, 0 AP, 0 DP, 0 MP", async () => {
        const newCharacterId = crypto.randomUUID()
        const expectedCharacter = {
            id: newCharacterId,
            playerId: playerDto.id,
            name: "Lyanna Mormont",
            rank: 1,
            level: 1,
            skillPoints: 12,
            healthPoints: 10,
            defensePoints: 0,
            attackPoints: 0,
            magikPoints: 0,
        }

        const characterCommand: CreateCharacterCommand = {
            id: newCharacterId,
            playerId: playerDto.id,
            name: "Lyanna Mormont",
            healthPoints: 10,
            defensePoints: 0,
            attackPoints: 0,
            magikPoints: 0,
        }

        const createCharacterUseCase = new CreateCharacter(
            unitOfWork.getCharacterWriteRepository(),
            unitOfWork.getPlayerReadRepository()
        )

        const createdCharacter = await createCharacterUseCase.execute(
            characterCommand
        )

        const newCharacter = await unitOfWork
            .getCharacterReadRepository()
            .read(createdCharacter.toDto().id)

        expect(expectedCharacter).toEqual(createdCharacter)
        expect(newCharacter).toEqual(createdCharacter)
    })
})
