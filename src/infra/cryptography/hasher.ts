import { compareSync, hashSync } from "bcrypt"
import { EncryptHasher } from "@/domain/account/application/cryptography/encrypt-hasher";
import { CompareHasher } from "@/domain/account/application/cryptography/compare-hasher";

export class Hasher implements EncryptHasher, CompareHasher {
  encrypt(value: string): string {
    return hashSync(value, 8)
  }

  compare(value: string, hash: string): boolean | Promise<boolean> {
      return compareSync(value, hash)
  }
}