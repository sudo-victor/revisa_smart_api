import { hashSync } from "bcrypt"
import { EncryptHasher } from "@/domain/account/application/cryptography/encrypt-hasher";

export class Hasher implements EncryptHasher {
  encrypt(value: string): string {
    return hashSync(value, 8)
  }
}