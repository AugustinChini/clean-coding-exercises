import * as dotenv from "dotenv"
import { env } from "process"
import server from "./server"
import ICharacterWriteRepository from "./core/useCases/character/interfaces/ICharacterWriteRepository"
import inMemoryCharacterWriteRepository from "./adapters/secondary/inMemory/inMemoryCharacterWriteRepository"
import CharacterRouter from "./adapters/primary/express/character"
import CreateCharacter from "./core/useCases/character/createCharacter"
import InMemoryPlayerDataSource from "./adapters/secondary/inMemory/inMemoryPlayerReadRepository"
import IPlayerReadRepository from "./core/useCases/character/interfaces/IPlayerReadRepository"

// load the env variables
dotenv.config()
// test the env vars
if (env.CONNECTION_STRING && env.PORT) {
    // Create DataSource
    const characterWriteRepository: ICharacterWriteRepository =
        new inMemoryCharacterWriteRepository()
    const playerReadRepository: IPlayerReadRepository =
        new InMemoryPlayerDataSource()

    const characterMiddleware = CharacterRouter(
        new CreateCharacter(characterWriteRepository, playerReadRepository)
    )

    // add Character middleware to the server
    server.use("/character", characterMiddleware)

    // Listening to the upcomming queries
    server.listen(env.PORT, () => {
        console.log(`Running on port ${env.PORT}`)
    })
} else {
    console.error("Missing env variables")
}
