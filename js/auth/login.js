document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    const form = document.getElementById("loginForm");

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const emailError =
    document.getElementById("emailError");

    const formMessage =
    document.getElementById("formMessage");

    const loginBtn =
    document.getElementById("loginBtn");

    const togglePassword =
    document.getElementById("togglePassword");

    // PASSWORD TOGGLE

    togglePassword.addEventListener("click", () => {

        const isPassword =
        password.type === "password";

        password.type =
        isPassword ? "text" : "password";

        togglePassword.innerHTML =
        isPassword
        ? '<i data-lucide="eye-off"></i>'
        : '<i data-lucide="eye"></i>';

        lucide.createIcons();

    });

    // HELPERS

    function showError(element, message) {

        element.textContent = message;
        element.classList.remove("hidden");

    }

    function clearError(element) {

        element.textContent = "";
        element.classList.add("hidden");

    }

    function showMessage(message, type = "success") {

        formMessage.classList.remove("hidden");

        if (type === "success") {

            formMessage.className =
            "mb-4 rounded-xl px-4 py-3 text-sm font-medium bg-emerald-100 text-emerald-700";

        } else {

            formMessage.className =
            "mb-4 rounded-xl px-4 py-3 text-sm font-medium bg-red-100 text-red-700";

        }

        formMessage.textContent = message;

    }

    // LOGIN

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        clearError(emailError);

        const emailValue =
        email.value.trim();

        const passwordValue =
        password.value;

        let isValid = true;

        // EMAIL VALIDATION

        const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {

            showError(
                emailError,
                "Enter a valid email address."
            );

            isValid = false;

        }

        if (!passwordValue) {

            showMessage(
                "Password is required.",
                "error"
            );

            isValid = false;

        }

        if (!isValid) return;

        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <span class="flex items-center justify-center gap-2">
                <i data-lucide="loader-circle"
                class="animate-spin w-4 h-4"></i>
                Logging In...
            </span>
        `;

        lucide.createIcons();

        setTimeout(() => {

            const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];

            const user =
            users.find(
                u =>
                u.email === emailValue &&
                u.password === passwordValue
            );

            if (!user) {

                showMessage(
                    "Invalid email or password.",
                    "error"
                );

                loginBtn.disabled = false;

                loginBtn.textContent =
                "Login";

                return;

            }

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            showMessage(
                "Login successful!"
            );

            setTimeout(() => {

                if (
                    !user.profileCompleted
                ) {

                    window.location.href =
                    "./profile.html";

                } else {

                    window.location.href =
                    "./dashboard.html";

                }

            }, 1500);

        }, 1500);

    });

    email.addEventListener("input", () => {

        clearError(emailError);

    });

});