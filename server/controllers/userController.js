import { createJWT } from "../utils/tokenUtils.js";
import client from "../config/database.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

export const register = async (req, res) => {
  try {
    const { FullName, UserName, Email, MobileNumber, Role, Password } = req.body;

    const existingUserQuery = "SELECT * FROM usertable WHERE email = $1";
    const existingUserResult = await client.query(existingUserQuery, [Email]);
    if (existingUserResult.rows.length > 0) {
      return res.status(409).json({
        success: false,
        msg: "User already registered with this email",
      });
    }

    const hashedPassword = await hashPassword(Password);
    const insertUserQuery = `
            INSERT INTO usertable (fullName,userName,email,mobilenumber,role,password) values ($1,$2,$3,$4,$5,$6)
        `;
    const userResult = await client.query(insertUserQuery, [
      FullName,
      UserName,
      Email,
      MobileNumber,
      Role,
      hashedPassword     
    ]);
    const user = userResult.rows[0];
    const token = createJWT({ userId: user.userid });

    res.status(201).json({
      success: true,
      userInfo: user,
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      success: false,
      msg: "Error registering user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const UserQuery = 'SELECT * FROM usertable WHERE email = $1'
        const userResult = await client.query(UserQuery, [email]);
        if (userResult.rows.length==0) {
            return res.status(401).json({ msg: "User is not registered" });
        }
        const user = userResult.rows[0];
        // const hashedPassword = await hashPassword(user.password);
        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "Invalid password" });
        }
        const token = createJWT({ userId: user.userid });
        res.status(200).json({ msg: "Login Successfully", userInfo: user, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ msg: "Error logging in", error: error.message });
    }
};
