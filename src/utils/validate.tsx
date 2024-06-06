export const checkValidData = (username: string, password: string): string | null => {
    const isUsernameValid: boolean = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username);
    const isPasswordValid: boolean = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  
    if (!isUsernameValid) return "Username is not valid";
    if (!isPasswordValid) return "Password is not valid";

    return null;
};