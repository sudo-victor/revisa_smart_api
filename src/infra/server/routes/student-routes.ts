import { Router } from "express"

import { MakeStudentSignin } from "@/infra/factories/make-student-signin"
import { MakeRegisterStudent } from "@/infra/factories/make-register-student"
import { MakeValidateUserByPhone } from "@/infra/factories/make-validate-user-by-phone"

const registerStudent = MakeRegisterStudent.make()
const studentSignin = MakeStudentSignin.make()
const validateUserByPhone = MakeValidateUserByPhone.make()

const studentRoutes = Router()

studentRoutes.post("/", registerStudent.handler.bind(registerStudent))
studentRoutes.post("/auth", studentSignin.handler.bind(studentSignin))
studentRoutes.get("/exists", validateUserByPhone.handler.bind(validateUserByPhone))

export { studentRoutes }