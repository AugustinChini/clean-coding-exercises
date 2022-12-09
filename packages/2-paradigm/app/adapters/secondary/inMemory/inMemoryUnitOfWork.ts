import ICharacterReadRepository from "../../../core/useCases/character/interfaces/ICharacterReadRepository"
import ICharacterWriteRepository from "../../../core/useCases/character/interfaces/ICharacterWriteRepository"
import IPlayerReadRepository from "../../../core/useCases/character/interfaces/IPlayerReadRepository"
import IPlayerWriteRepository from "../../../core/useCases/character/interfaces/IPlayerWriteRepository"
import CharacterDto from "../../../core/models/character/dto/characterDto"
import PlayerDto from "../../../core/models/player/dto/player"
import InMemoryCharacterReadRepository from "./inMemoryCharacterReadRepository"
import InMemoryCharacterWriteRepository from "./inMemoryCharacterWriteRepository"
import InMemoryPlayerWriteRepository from "./inMemoryPlayerWriteRepository"
import InMemoryPlayerReadRepository from "./inMemoryPlayerReadRepository"

export default class InMemoryUnitOfWork {
    private characterContext: Array<CharacterDto> = []
    private playerContext: Array<PlayerDto> = []

    private characterReadRepository: ICharacterReadRepository
    private characterWriteRepository: ICharacterWriteRepository
    private playerReadRepository: IPlayerReadRepository
    private playerWriteRepository: IPlayerWriteRepository

    constructor() {
        this.characterReadRepository = new InMemoryCharacterReadRepository(
            this.characterContext
        )
        this.characterWriteRepository = new InMemoryCharacterWriteRepository(
            this.characterContext
        )
        this.playerReadRepository = new InMemoryPlayerReadRepository(
            this.playerContext
        )
        this.playerWriteRepository = new InMemoryPlayerWriteRepository(
            this.playerContext
        )
    }

    public getCharacterReadRepository(): ICharacterReadRepository {
        return this.characterReadRepository
    }

    public getCharacterWriteRepository(): ICharacterWriteRepository {
        return this.characterWriteRepository
    }

    public getPlayerReadRepository(): IPlayerReadRepository {
        return this.playerReadRepository
    }

    public getPlayerWriteRepository(): IPlayerWriteRepository {
        return this.playerWriteRepository
    }
}
