import { ValidateUserByPhoneUsecase } from "@/domain/account/application/usecases/validate-user-by-phone-usecase";
import { PrismaStudentRepository } from "../database/prisma/repositories/prisma-student-repository";
import { ValidateUserByPhoneController } from "../controllers/account/validate-user-by-phone-controller";

export class MakeValidateUserByPhone {
  static make() {
    const studentRepository = new PrismaStudentRepository()
    const validateUserByPhoneUsecase = new ValidateUserByPhoneUsecase(studentRepository)
    const validateUserByPhoneController = new ValidateUserByPhoneController(validateUserByPhoneUsecase)
    return validateUserByPhoneController
  }
}