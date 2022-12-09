import crypto from "crypto"
import CreateCharacter from "../../app/core/useCases/character/createCharacter"
import CreateCharacterCommand from "../../app/core/useCases/character/types/createCharacterCommand"
import PlayerDto from "../../app/core/models/player/dto/player"
import InMemoryUnitOfWork from "../../app/adapters/secondary/inMemory/inMemoryUnitOfWork"
import CharacterLimitException from "../../app/core/exceptions/characterLimitException"

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

    test("a new character with 11 HP and 1 AP, 1 DP and 1 MP should have 8 SP left", async () => {
        const newCharacterId = crypto.randomUUID()
        const expectedCharacter = {
            id: newCharacterId,
            playerId: playerDto.id,
            name: "Daenerys Targaryen",
            rank: 1,
            level: 1,
            skillPoints: 8,
            healthPoints: 11,
            defensePoints: 1,
            attackPoints: 1,
            magikPoints: 1,
        }

        const characterCommand: CreateCharacterCommand = {
            id: newCharacterId,
            playerId: playerDto.id,
            name: "Daenerys Targaryen",
            healthPoints: 11,
            defensePoints: 1,
            attackPoints: 1,
            magikPoints: 1,
        }

        const createCharacterUseCase = new CreateCharacter(
            unitOfWork.getCharacterWriteRepository(),
            unitOfWork.getPlayerReadRepository()
        )

        const createdCharacter = await createCharacterUseCase.execute(
            characterCommand
        )

        expect(expectedCharacter).toEqual(createdCharacter)
    })

    test("a new character with 11 HP and 8 AP should have 1 SP left", async () => {
        const newCharacterId = crypto.randomUUID()
        const expectedCharacter = {
            id: newCharacterId,
            playerId: playerDto.id,
            name: "Robert Baratheon",
            rank: 1,
            level: 1,
            skillPoints: 1,
            healthPoints: 11,
            defensePoints: 0,
            attackPoints: 8,
            magikPoints: 0,
        }

        const characterCommand: CreateCharacterCommand = {
            id: newCharacterId,
            playerId: playerDto.id,
            name: "Robert Baratheon",
            healthPoints: 11,
            defensePoints: 0,
            attackPoints: 8,
            magikPoints: 0,
        }

        const createCharacterUseCase = new CreateCharacter(
            unitOfWork.getCharacterWriteRepository(),
            unitOfWork.getPlayerReadRepository()
        )

        const createdCharacter = await createCharacterUseCase.execute(
            characterCommand
        )

        expect(expectedCharacter).toEqual(createdCharacter)
    })

    test("When I try to create an eleventh character, I receive an error message", async () => {
        const characterCommand: CreateCharacterCommand = {
            id: crypto.randomUUID(),
            playerId: playerDto.id,
            name: "Multifaced Arya Stark",
            healthPoints: 11,
            defensePoints: 1,
            attackPoints: 1,
            magikPoints: 1,
        }

        const insertElevenCharcters = async () => {
            for (let index = 0; index < 12; index++) {
                const createCharacterUseCase = new CreateCharacter(
                    unitOfWork.getCharacterWriteRepository(),
                    unitOfWork.getPlayerReadRepository()
                )

                await createCharacterUseCase.execute({
                    ...characterCommand,
                    name: `${characterCommand.name} ${index}`,
                })
            }
        }

        // TODO finish link between player and charcter
        expect(insertElevenCharcters).toThrow(CharacterLimitException)
    })
})
