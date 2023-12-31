import jwt, { Secret } from "jsonwebtoken"

export const createResetPasswordToken = (userEmail: string) => {
  // Get the current time (in seconds)
  const currentTime = Math.floor(Date.now() / 1000);
  
  // Calculate the expiration time (current time + 5 minutes = 300 seconds)
  const expirationTime = currentTime + 300;

  // Create the payload with the email and expiration time
  const payload = {
    email: userEmail,
    exp: expirationTime,
  };

  // Create the token using jwt.sign
  return jwt.sign(payload, process.env.RESET_PASSWORD_SECRET as Secret);
};
