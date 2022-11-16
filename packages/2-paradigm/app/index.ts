import { env } from "process"
import * as dotenv from "dotenv"
import server from "./server"
import ICharacterDataSource from "./core/useCases/character/interfaces/ICharacterDataSource"
import InMemoryCharacterDataSource from "./adapters/secondary/inMemory/inMemoryCharacterDataSource"
import CharacterRouter from "./adapters/primary/express/character"
import CreateCharacter from "./core/useCases/character/createCharacter"
import InMemoryPlayerDataSource from "./adapters/secondary/inMemory/inMemoryPlayerDataSource"
import IPlayerDataSource from "./core/useCases/character/interfaces/IPlayerDataSource"
import UuidGenerator from "./adapters/primary/common/uuidGenerator"

// load the env variables
dotenv.config()
// test the env vars
if (env.CONNECTION_STRING && env.PORT) {
    // Create DataSource
    const inMemoryCharacterDataSource: ICharacterDataSource =
        new InMemoryCharacterDataSource()
    const inMemoryPlayerDataSource: IPlayerDataSource =
        new InMemoryPlayerDataSource()

    const characterMiddleware = CharacterRouter(
        new CreateCharacter(
            inMemoryCharacterDataSource,
            inMemoryPlayerDataSource,
            new UuidGenerator()
        )
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
