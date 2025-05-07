export const validateLogin = (email: string, password: string) => {
    const errors = {email: '', password: ''}

    if (!email.trim()) {
        errors.email = 'Enter the email!';
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        errors.email = 'Enter a valid email!';
    }

    if (!password.trim()) {
        errors.password = 'Enter the password!';
    }
    
    return errors;
}; 