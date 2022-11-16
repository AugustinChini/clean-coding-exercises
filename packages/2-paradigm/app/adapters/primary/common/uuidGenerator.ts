import crypto from "crypto"
import IUuidGenerator from "../../../core/common/IUuidGenerator"

export default class UuidGenerator implements IUuidGenerator {
    public generate() {
        return crypto.randomUUID()
    }
}
