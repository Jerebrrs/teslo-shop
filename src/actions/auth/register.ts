"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
    });

    const { password: _, ...rest } = user;

    return {
      ok: true,
      user: rest,
      message: "Usuario Creado.",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se logro crear el usuario",
    };
  }
};



