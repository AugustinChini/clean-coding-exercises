import IUuidGenerator from "../../common/IUuidGenerator"
import Character from "../../models/character/character"
import ICharacterDataSource from "./interfaces/ICharacterDataSource"
import CreateCharacterCommand from "./types/createCharacterCommand"

export default class CreateCharacter {
    private characterDataSource: ICharacterDataSource

    private uuidGenerator: IUuidGenerator

    constructor(
        characterDataSource: ICharacterDataSource,
        uuid4Generator: IUuidGenerator
    ) {
        this.characterDataSource = characterDataSource
        this.uuidGenerator = uuid4Generator
    }

    async execute(command: CreateCharacterCommand): Promise<void> {
        // create the character
        const newCharacter = new Character({
            id: this.uuidGenerator.generate(),
            name: command.name,
            playerId: command.playerId,
        })
        //apply the diffent points
        newCharacter.applySkillsPoints(
            command.healthPoints,
            command.attackPoints,
            command.defensePoints,
            command.magikPoints
        )
        // save
        const player = await this.#playerReadRepository.read(playerId)
        player.canCreateCharacterOrThrow(newCharacter.toDto())

        await this.characterDataSource.create(newCharacter.toDto())
    }
}
