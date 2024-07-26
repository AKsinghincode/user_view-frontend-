function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function validateUsername(username) {
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]{10,16}$/;
    const usernameError = document.getElementById('usernameError');
    if (!usernameRegex.test(username)) {
        usernameError.textContent = 'Username must be 10-16 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        return false;
    }
    usernameError.textContent = '';
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('emailError');
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Invalid email format.';
        return false;
    }
    emailError.textContent = '';
    return true;
}

function validatePassword(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    const veryWeakRegex = /^(?=.{1,7}$)/; // Less than 8 characters
    const weakRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // At least 8 characters with letters and numbers
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // At least 8 characters with mixed case letters and numbers
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]{10,}$/; // At least 10 characters with mixed case letters, numbers, and special characters

    if (veryWeakRegex.test(password)) {
        strengthIndicator.textContent = 'Very weak';
        strengthIndicator.style.color = 'red';
        return false;
    } else if (weakRegex.test(password)) {
        strengthIndicator.textContent = 'Weak';
        strengthIndicator.style.color = 'orange';
        return false;
    } else if (mediumRegex.test(password)) {
        strengthIndicator.textContent = 'Medium';
        strengthIndicator.style.color = 'yellow';
        return true;
    } else if (strongRegex.test(password)) {
        strengthIndicator.textContent = 'Strong';
        strengthIndicator.style.color = 'green';
        return true;
    } else {
        strengthIndicator.textContent = '';
        return false;
    }
}

function validateForm() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const age = document.getElementById('register-age').value;
    const name = document.getElementById('register-name').value;
    const gender = document.getElementById('register-gender').value;
    const phone = document.getElementById('register-phone').value;
    const location = document.getElementById('register-location').value;
    
    let isValid = true;

    if (!validateUsername(username)) isValid = false;
    if (!validateEmail(email)) isValid = false;
    if (!validatePassword(password)) isValid = false;

    // Additional validation for other fields if needed
    // Example: Validate age, phone number, location, etc.

    return isValid;
}

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!validateForm()) {
        alert('Please fix the errors in the form.');
        return;
    }

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const age = document.getElementById('register-age').value;
    const name = document.getElementById('register-name').value;
    const gender = document.getElementById('register-gender').value;
    const phone = document.getElementById('register-phone').value;
    const location = document.getElementById('register-location').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, age, name, gender, phone, location })
        });

        if (response.ok) {
            alert('Registration successful!');
            showLoginForm();
        } else {
            alert('Error registering user');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error registering user');
    }
});

document.getElementById('register-password').addEventListener('input', function() {
    validatePassword(this.value);
});
