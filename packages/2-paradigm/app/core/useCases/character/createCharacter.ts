import IUuidGenerator from "../../common/IUuidGenerator"
import CharacterLimitException from "../../exceptions/characterLimitException"
import CharacterNameAlreadyExistException from "../../exceptions/characterNameAlreadyExistException"
import Character from "../../models/character/character"
import ICharacterDataSource from "./interfaces/ICharacterDataSource"
import IPlayerDataSource from "./interfaces/IPlayerDataSource"
import CreateCharacterCommand from "./types/createCharacterCommand"

export default class CreateCharacter {
    private characterDataSource: ICharacterDataSource
    private playerDataSource: IPlayerDataSource
    private uuidGenerator: IUuidGenerator

    constructor(
        characterDataSource: ICharacterDataSource,
        playerDataSource: IPlayerDataSource,
        uuid4Generator: IUuidGenerator
    ) {
        this.characterDataSource = characterDataSource
        this.playerDataSource = playerDataSource
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

        const playerDto = (
            await this.playerDataSource.read(command.playerId)
        ).toDto()

        // check if there is less than 10 characters
        if (playerDto.characters.length >= 10) {
            throw new CharacterLimitException()
        } else if (playerDto.characters.find((c) => c.name === command.name)) {
            // check if the name already exist
            throw new CharacterNameAlreadyExistException()
        }
        // save
        await this.characterDataSource.create(newCharacter.toDto())
    }
}
