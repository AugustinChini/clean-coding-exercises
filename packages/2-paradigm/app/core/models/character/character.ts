import CharacterNameTooLongException from "../../exceptions/character/characterNameTooLongException"
import CharacterDto from "./dto/characterDto"

export default class Character {
    private id: string
    private name: string
    private playerId: string
    private level: number
    private rank: number
    private skillPoints: number
    private healthPoints: number
    private attackPoints: number
    private defensePoints: number
    private magikPoints: number

    public constructor(character: CharacterDto) {
        if (character.name.length > 25) {
            throw new CharacterNameTooLongException()
        }
        this.id = character.id
        this.name = character.name
        this.playerId = character.playerId
        this.level = character.level || 1
        this.rank = character.rank || 1
        this.skillPoints = character.skillPoints
        this.healthPoints = character.healthPoints
        this.attackPoints = character.attackPoints
        this.defensePoints = character.defensePoints
        this.magikPoints = character.magikPoints
    }

    /**
     * applySkillsPoints Apply the skills points to the categories
     */
    public applySkillsPoints(points: {
        heath: number
        attack: number
        defense: number
        magik: number
    }) {
        let remainingSkills = this.skillPoints
        remainingSkills -= this.addHealthPoints(points.heath)
        remainingSkills -= this.addAttackPoints(points.attack)
        remainingSkills -= this.addDefensePoints(points.defense)
        remainingSkills -= this.addMagikPoints(points.magik)
    }

    /**
     * Check the number of skills points to spend to have Npoints in a category
     */
    private getSkillPointToSpend(pointsToAdd: number) {
        let toSpend = 0
        for (let index = 0; index < pointsToAdd; index++) {
            toSpend +=  Math.ceil(index / 5) : 1;
        }
    }
    /**
     * addHealthPoints increase the Heath points according to the skill point rule
     * @return {number} the skills points left
     */
    public addHealthPoints(pointsToAdd: number): number {}

    /**
     * addAttackPoints increase the Attack points according to the skill point rule
     * @return {number} the skills points left
     */
    public addAttackPoints(pointsToAdd: number): number {}
    /**
     * addDefensePoints increase the Defense points according to the skill point rule
     * @return {number} the skills points left
     */
    public addDefensePoints(pointsToAdd: number): number {}
    /**
     * addMagikPoints increase the Magik points according to the skill point rule
     * @return {number} the skills points left
     */
    public addMagikPoints(pointsToAdd: number): number {}

    /**
     * toDto return a readOnly deep copy of the character
     */
    public toDto() {
        return new CharacterDto({
            id: this.id,
            name: this.name,
            playerId: this.playerId,
            level: this.level,
            rank: this.rank,
            skillPoints: this.skillPoints,
            healthPoints: this.healthPoints,
            attackPoints: this.attackPoints,
            defensePoints: this.defensePoints,
            magikPoints: this.magikPoints,
        })
    }
}
