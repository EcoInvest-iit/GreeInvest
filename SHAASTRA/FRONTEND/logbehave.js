function showLogin() {
    document.getElementById('logForm').classList.remove('hidden');
    document.getElementById('signForm').classList.add('hidden');
    document.getElementById('logBtn').classList.add('bg-white', 'shadow-sm');
    document.getElementById('signBtn').classList.remove('bg-white', 'shadow-sm');
}

function showSignup() {
    document.getElementById('logForm').classList.add('hidden');
    document.getElementById('signForm').classList.remove('hidden');
    document.getElementById('logBtn').classList.remove('bg-white', 'shadow-sm');
    document.getElementById('signBtn').classList.add('bg-white', 'shadow-sm');
}

// Initial state
showLogin();

// Form submission handling
document.getElementById('logForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('logEmail').value;
    const password = document.getElementById('logPass').value;

    try {
        const response = await fetch('YOUR_MONGODB_ATLAS_ENDPOINT/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        alert('Welcome back! Login successful.');
    } catch (error) {
        alert('Invalid credentials. Please check your email and password.');
    }
});

document.getElementById('signForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signName').value;
    const email = document.getElementById('signEmail').value;
    const password = document.getElementById('signPass').value;

    try {
        const response = await fetch('YOUR_MONGODB_ATLAS_ENDPOINT/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        alert('Account created successfully! Please login to continue.');
        showLogin();
        document.getElementById('signForm').reset();
    } catch (error) {
        alert('Signup failed. Please try again or use a different email.');
    }
});