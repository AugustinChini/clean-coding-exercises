export default class CharacterDto {
    readonly id: string
    readonly name: string
    readonly playerId: string
    readonly level: number
    readonly rank: number
    readonly skillPoints: number
    readonly healthPoints: number
    readonly attackPoints: number
    readonly defensePoints: number
    readonly magikPoints: number

    public constructor(characterDto: CharacterDto) {
        this.id = characterDto.id
        this.name = characterDto.name
        this.playerId = characterDto.playerId
        this.level = characterDto.level
        this.rank = characterDto.rank
        this.skillPoints = characterDto.skillPoints
        this.healthPoints = characterDto.healthPoints
        this.attackPoints = characterDto.attackPoints
        this.defensePoints = characterDto.defensePoints
        this.magikPoints = characterDto.magikPoints
    }
}
