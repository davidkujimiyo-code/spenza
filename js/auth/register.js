document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    const form = document.getElementById("registerForm");

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const fullNameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    const registerBtn =
    document.getElementById("registerBtn");

    const formMessage =
    document.getElementById("formMessage");


    function showError(element, message) {
    element.textContent = message;
    element.classList.remove("hidden");
    }

    function clearError(element) {
    element.textContent = "";
    element.classList.add("hidden");
    }
    
    function showSuccess(message) {

    formMessage.textContent = message;

    formMessage.className =
    "mb-4 rounded-xl px-4 py-3 text-sm font-medium bg-emerald-100 text-emerald-700";

    }

    function showErrorMessage(message) {

    formMessage.textContent = message;

    formMessage.className =
    "mb-4 rounded-xl px-4 py-3 text-sm font-medium bg-red-100 text-red-700";

    }

    function hideMessage() {

    formMessage.classList.add("hidden");

    }
    
    function setupPasswordToggle(buttonId, inputId) {

        const button = document.getElementById(buttonId);
        const input = document.getElementById(inputId);

        button.addEventListener("click", () => {

        const isPassword =
        input.type === "password";

        input.type =
        isPassword ? "text" : "password";

        button.innerHTML =
        isPassword
        ? '<i data-lucide="eye-off"></i>'
        : '<i data-lucide="eye"></i>';

        lucide.createIcons();

        });

        }

        setupPasswordToggle(
        "togglePassword",
        "password"
        );

        setupPasswordToggle(
        "toggleConfirmPassword",
        "confirmPassword"
        );


        const passwordMatch =
        document.getElementById("password-match");

        function checkPasswordMatch() {

        if (!confirmPassword.value) {

        passwordMatch.textContent = "";
        return;

        }

        if (password.value === confirmPassword.value) {

        passwordMatch.textContent =
        "✓ Passwords match";

        passwordMatch.className =
        "mt-2 text-xs text-emerald-500";

        } else {

        passwordMatch.textContent =
        "✗ Passwords do not match";

        passwordMatch.className =
        "mt-2 text-xs text-red-500";

        }

        }

        password.addEventListener(
        "input",
        checkPasswordMatch
        );

        confirmPassword.addEventListener(
        "input",
        checkPasswordMatch
        );

        password.addEventListener("input", () => {

        const value = password.value;
        const bar = document.getElementById("strength-bar");

        let strength = 0;

        if (value.length >= 8) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[^A-Za-z0-9]/.test(value)) strength++;

        if (strength === 1) {
            bar.style.width = "25%";
            bar.className = "h-full bg-red-500";
        }

        if (strength === 2) {
            bar.style.width = "50%";
            bar.className = "h-full bg-orange-500";
        }

        if (strength === 3) {
            bar.style.width = "75%";
            bar.className = "h-full bg-yellow-500";
        }

        if (strength === 4) {
            bar.style.width = "100%";
            bar.className = "h-full bg-emerald-500";
        }

        });



        form.addEventListener("submit", (e) => {

        e.preventDefault();

        let isValid = true;

        clearError(fullNameError);
        clearError(emailError);
        clearError(passwordError);
        clearError(confirmPasswordError);

        // FULL NAME

        if (fullName.value.trim().length < 2) {

            showError(
                fullNameError,
                "Full name must be at least 2 characters."
            );

            isValid = false;
        }

        // EMAIL

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value)) {

            showError(
                emailError,
                "Enter a valid email address."
            );

            isValid = false;
        }

        // PASSWORD

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password.value)) {

            showError(
                passwordError,
                "Password does not meet requirements."
            );

            isValid = false;
        }

        // CONFIRM PASSWORD

        if (password.value !== confirmPassword.value) {

            showError(
                confirmPasswordError,
                "Passwords do not match."
            );

            isValid = false;
        }

        if (isValid) {

        hideMessage();

        registerBtn.disabled = true;

        registerBtn.innerHTML = `
            <span class="flex items-center justify-center gap-2">
                <i data-lucide="loader-circle"
                class="animate-spin w-4 h-4"></i>
                Creating Account...
            </span>
        `;

        lucide.createIcons();

        setTimeout(() => {

        registerBtn.disabled = false;

        registerBtn.textContent =
        "Create Account";

        const user = {

        fullName: fullName.value.trim(),

        email: email.value.trim(),

        password: password.value,

        profileCompleted: false,

        profile: {}

        };

        const users =
        JSON.parse(
        localStorage.getItem("users")
        ) || [];

        const existingUser =
        users.find(
        u => u.email === user.email
        );

        if (existingUser) {

        showErrorMessage(
        "An account with this email already exists."
        );

        registerBtn.disabled = false;

        registerBtn.textContent =
        "Create Account";

        return;

        }

        users.push(user);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        showSuccess(
        "Account created successfully!"
        );

        setTimeout(() => {

        window.location.href =
        "./profile.html";

        }, 1500);

        }, 2000);

        }

        });


        fullName.addEventListener("input", () => {
        clearError(fullNameError);
        });

        email.addEventListener("input", () => {
        clearError(emailError);
        });

        password.addEventListener("input", () => {
        clearError(passwordError);
        });

        confirmPassword.addEventListener("input", () => {
        clearError(confirmPasswordError);
        });

        lucide.createIcons()

        });