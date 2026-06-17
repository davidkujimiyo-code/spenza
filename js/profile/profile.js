document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    // GET CURRENT USER

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        window.location.href = "./login.html";
        return;

    }

    // WELCOME MESSAGE

    const firstName =
        currentUser.fullName.split(" ")[0];

    document.getElementById("welcomeName").innerHTML =
    `Welcome, <span class="text-white">${firstName}</span> 👋`;

    document.getElementById("mobileWelcomeName").textContent =
        `Welcome, ${firstName} 👋`;

    // ELEMENTS

    const form =
        document.getElementById("profileForm");

    const phone =
        document.getElementById("phone");

    const country =
        document.getElementById("country");

    const currency =
        document.getElementById("currency");

    const income =
        document.getElementById("income");

    const incomeSource =
        document.getElementById("incomeSource");

    const completeSetupBtn =
        document.getElementById("completeSetupBtn");

    const profileMessage =
        document.getElementById("profileMessage");

    const goalCards =
    document.querySelectorAll(".goal-card");

    
    let selectedGoals = [];

    const stepFinancial =
    document.getElementById("stepFinancial");

    const stepGoal =
    document.getElementById("stepGoal");

    const profilePercent =
    document.getElementById("profilePercent");

    const profileProgressBar =
    document.getElementById("profileProgressBar");


    function activateStep(step) {

    step.classList.remove(
        "bg-white/5",
        "border-white/10",
        "text-slate-200"
    );

    step.classList.add(
        "bg-emerald-500/15",
        "border-emerald-500/40",
        "text-emerald-300",
        "shadow-lg",
        "shadow-emerald-500/20"
    );

    }

    function updateProgress() {

    let progress = 20;

    // Reset visual states

    stepFinancial.classList.remove(
    "bg-emerald-500/15",
    "border-emerald-500/40",
    "text-emerald-300",
    "shadow-lg",
    "shadow-emerald-500/20"
    );

    stepGoal.classList.remove(
    "bg-emerald-500/15",
    "border-emerald-500/40",
    "text-emerald-300",
    "shadow-lg",
    "shadow-emerald-500/20"
    );

    stepFinancial.classList.add(
    "bg-white/5",
    "border-white/10",
    "text-slate-200"
    );

    stepGoal.classList.add(
    "bg-white/5",
    "border-white/10",
    "text-slate-200"
    );

    if (
        phone.value.trim() &&
        country.value &&
        currency.value &&
        income.value &&
        incomeSource.value
    ) {

        progress = 70;

        activateStep(stepFinancial);

    }

    if (
        selectedGoals.length > 0 &&
        phone.value.trim() &&
        country.value &&
        currency.value &&
        income.value &&
        incomeSource.value
    ) {

        progress = 100;

        activateStep(stepGoal);

    }

    profilePercent.textContent =
        `${progress}%`;

    profileProgressBar.style.width =
        `${progress}%`;

}

    phone.addEventListener("input", updateProgress);

    country.addEventListener("change", updateProgress);

    currency.addEventListener("change", updateProgress);

    income.addEventListener("input", updateProgress);

    incomeSource.addEventListener("change", updateProgress);

    
    // GOAL SELECTION

   goalCards.forEach(card => {

    card.addEventListener("click", () => {

        const goal = card.dataset.goal;

        if (selectedGoals.includes(goal)) {

            // Remove goal

            selectedGoals =
            selectedGoals.filter(
                item => item !== goal
            );

            card.classList.remove(
            "bg-emerald-500",
            "border-emerald-500",
            "text-white",
            "shadow-xl",
            "shadow-emerald-500/40",
            "scale-[1.02]"
        );

            card.classList.add(
            "bg-white",
            "border-slate-200"
        );

            card.querySelector(".goal-check")
            ?.classList.add("hidden");

            card.querySelector(".goal-icon")
            ?.classList.remove("text-white");

            card.querySelector(".goal-icon")
            ?.classList.add("text-slate-600");

        } else {

            selectedGoals.push(goal);

            card.classList.remove(
                "bg-white",
                "border-slate-200"
            );

            card.classList.add(
            "bg-emerald-500",
            "border-emerald-500",
            "text-white",
            "shadow-xl",
            "shadow-emerald-500/40",
            "scale-[1.02]"
        )

            card.querySelector(".goal-check")
            ?.classList.remove("hidden");

            card.querySelector(".goal-icon")
            ?.classList.remove("text-slate-600");

            card.querySelector(".goal-icon")
            ?.classList.add("text-white");

        }

        updateProgress();

    });

    });

    // MESSAGE HELPERS

    function showSuccess(message) {

        profileMessage.classList.remove("hidden");

        profileMessage.className =
            "rounded-xl px-4 py-3 text-sm font-medium bg-emerald-100 text-emerald-700";

        profileMessage.textContent =
            message;

    }

    function showError(message) {

        profileMessage.classList.remove("hidden");

        profileMessage.className =
            "rounded-xl px-4 py-3 text-sm font-medium bg-red-100 text-red-700";

        profileMessage.textContent =
            message;

    }


    // FORM SUBMIT

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        profileMessage.classList.add("hidden");

        if (
            !phone.value.trim() ||
            !country.value ||
            !currency.value ||
            !income.value ||
            !incomeSource.value ||
            selectedGoals.length === 0
        ) {

            showError(
                "Please complete all profile fields."
            );

            return;

        }

        // LOADING STATE

        completeSetupBtn.disabled = true;

        completeSetupBtn.innerHTML = `
            <span class="flex items-center justify-center gap-2">
                <i data-lucide="loader-circle"
                class="animate-spin w-4 h-4"></i>
                Saving Profile...
            </span>
        `;

        lucide.createIcons();

        setTimeout(() => {

            
            // UPDATE USER

            currentUser.profileCompleted = true;

            currentUser.profile = {

                phone:
                    phone.value.trim(),

                country:
                    country.value,

                currency:
                    currency.value,

                income:
                    income.value,

                incomeSource:
                    incomeSource.value,

                financialGoals:
                    selectedGoals

            };

            // Update current user

            localStorage.setItem(
                "currentUser",
                JSON.stringify(currentUser)
            );

            // Update users array

            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            const updatedUsers =
                users.map(user => {

                    if (
                        user.email === currentUser.email
                    ) {

                        return currentUser;

                    }

                    return user;

                });

            localStorage.setItem(
                "users",
                JSON.stringify(updatedUsers)
            );

            showSuccess(
                "Profile completed successfully!"
            );

            completeSetupBtn.innerHTML =
                "Complete Setup";

            completeSetupBtn.disabled = false;

            
            // REDIRECT

            setTimeout(() => {

                window.location.href =
                    "./dashboard.html";

            }, 1500);

        }, 2000);

    });
    
    updateProgress();
});