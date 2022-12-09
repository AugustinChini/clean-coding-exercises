import crypto from "crypto"
import Character from "../../models/character/character"
import ICharacterWriteRepository from "./interfaces/ICharacterWriteRepository"
import IPlayerReadRepository from "./interfaces/IPlayerReadRepository"
import CreateCharacterCommand from "./types/createCharacterCommand"

export default class CreateCharacter {
    private characterWriteRepository: ICharacterWriteRepository
    private playerReadRepository: IPlayerReadRepository

    constructor(
        characterWriteRepository: ICharacterWriteRepository,
        playerReadRepository: IPlayerReadRepository
    ) {
        this.characterWriteRepository = characterWriteRepository
        this.playerReadRepository = playerReadRepository
    }

    async execute(command: CreateCharacterCommand): Promise<Character> {
        // create the character
        const newCharacter = new Character({
            id: command.id,
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

        // get player
        const player = await this.playerReadRepository.read(command.playerId)
        // check if it's possible to create a new character according to the player rules
        player.canCreateCharacter(newCharacter)

        // save character
        await this.characterWriteRepository.create(newCharacter.toDto())
        // TODO add a line player.addCharacterToCollection(charcterDto)
        return newCharacter
    }
}
