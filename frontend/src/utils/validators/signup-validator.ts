export const validateSignup = (name: string, email: string, password: string, confirmPassword: string) => {
    const errors = { name: '', email: '', password: '', confirmPassword: '' }

    if (!name.trim()) {
        errors.name = 'Enter the name!';
    } else if (!/^[a-zA-Z ]{2,30}$/.test(name)) {
        errors.name = 'Enter a valid name!';
    }

    if (!email.trim()) {
        errors.email = 'Enter the email!';
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        errors.email = 'Enter a valid email!';
    }

    if (!password.trim()) {
        errors.password = 'Enter the password!';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters!';
    }

    if (!confirmPassword.trim()) {
        errors.confirmPassword = 'Confirm the password!';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match!';
    }

    return errors;
}; 