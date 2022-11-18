import UuidGenerator from "../../app/adapters/primary/common/uuidGenerator"
import InMemoryCharacterDataSource from "../../app/adapters/secondary/inMemory/inMemoryCharacterDataSource"
import InMemoryPlayerDataSource from "../../app/adapters/secondary/inMemory/inMemoryPlayerDataSource"
import ICharacterDataSource from "../../app/core/useCases/character/interfaces/ICharacterDataSource"
import IPlayerDataSource from "../../app/core/useCases/character/interfaces/IPlayerDataSource"
import CreateCharacter from "../../app/core/useCases/character/createCharacter"
import CreateCharacterCommand from "packages/2-paradigm/app/core/useCases/character/types/createCharacterCommand"

describe("Create character", () => {
    const inMemoryCharacterDataSource: ICharacterDataSource =
        new InMemoryCharacterDataSource()
    const inMemoryPlayerDataSource: IPlayerDataSource =
        new InMemoryPlayerDataSource()

    test("a new character should have 12 SP, 10 HP, 0 AP, 0 DP, 0 MP", async () => {
        const newUser: CreateCharacterCommand = {
            playerId: "XXX",
            name: "John Doe",
            healthPoints: 0,
            defensePoints: 0,
            attackPoints: 0,
            magikPoints: 0,
        }

        const createCharacterUseCase = new CreateCharacter(
            inMemoryCharacterDataSource,
            inMemoryPlayerDataSource,
            new UuidGenerator()
        )

        await createCharacterUseCase.execute(newUser)
        expect(mockUserDataSource.create).toBeCalledTimes(1)
    })
})
