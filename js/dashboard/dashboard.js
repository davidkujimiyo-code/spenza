document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // LUCIDE
    // =========================

    lucide.createIcons();

    // =========================
    // AUTH GUARD
    // =========================

    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!currentUser) {

        window.location.href =
            "./login.html";

        return;

    }

    // =========================
    // WELCOME USER
    // =========================

    const firstName =
        currentUser.fullName.split(" ")[0];

    const welcome =
        document.getElementById(
            "dashboardWelcome"
        );

    if (welcome) {

        welcome.textContent =
            `Welcome Back, ${firstName} 👋`;

    }

    // =========================
    // USER AVATAR
    // =========================

    const avatar =
        document.getElementById(
            "userAvatar"
        );

    if (avatar) {

        const names =
            currentUser.fullName.split(" ");

        const initials =
            names.length > 1
                ? names[0][0] + names[1][0]
                : names[0][0];

        avatar.textContent =
            initials.toUpperCase();

    }

    // =========================
    // MOBILE DRAWER
    // =========================

    const mobileMenuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );

    const mobileDrawer =
        document.getElementById(
            "mobileDrawer"
        );

    const drawerOverlay =
        document.getElementById(
            "drawerOverlay"
        );

    if (
        mobileMenuBtn &&
        mobileDrawer &&
        drawerOverlay
    ) {

        mobileMenuBtn.addEventListener(
            "click",
            () => {

                mobileDrawer.classList.remove(
                    "-translate-x-full"
                );

                drawerOverlay.classList.remove(
                    "hidden"
                );

            }
        );

        drawerOverlay.addEventListener(
            "click",
            () => {

                mobileDrawer.classList.add(
                    "-translate-x-full"
                );

                drawerOverlay.classList.add(
                    "hidden"
                );

            }
        );

    }

    // =========================
    // DARK MODE
    // =========================

    const html =
        document.documentElement;

    const savedTheme =
    localStorage.getItem("theme");

    if(savedTheme === "dark"){

        html.classList.add("dark");

        setTimeout(() => {

            document
            .querySelectorAll(
                "#themeToggle i, #mobileThemeToggle i"
            )
            .forEach(icon => {

                icon.setAttribute(
                    "data-lucide",
                    "sun"
                );

            });

            lucide.createIcons();

        },100);

    }

    function toggleTheme() {

    html.classList.toggle("dark");

    const isDark =
        html.classList.contains("dark");

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    const desktopIcon =
        document.querySelector(
            "#themeToggle i"
        );

    const mobileIcon =
        document.querySelector(
            "#mobileThemeToggle i"
        );

    if (desktopIcon) {

        desktopIcon.setAttribute(
            "data-lucide",
            isDark ? "sun" : "moon"
        );

    }

    if (mobileIcon) {

        mobileIcon.setAttribute(
            "data-lucide",
            isDark ? "sun" : "moon"
        );

    }

    lucide.createIcons();

}

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    const mobileThemeToggle =
        document.getElementById(
            "mobileThemeToggle"
        );

    const themeToggleDesktop =
        document.getElementById(
            "themeToggle"
        );

    if (themeToggleDesktop) {

        themeToggleDesktop.addEventListener(
            "click",
            toggleTheme
        );

    }

    if (mobileThemeToggle) {

        mobileThemeToggle.addEventListener(
            "click",
            toggleTheme
        );

    }

    // =========================
    // LOGOUT
    // =========================

    function logout() {

        localStorage.removeItem(
            "currentUser"
        );

        window.location.href =
            "./login.html";

    }

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    const logoutBtnMobile =
        document.getElementById(
            "logoutBtnMobile"
        );

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logout
        );

    }

    if (logoutBtnMobile) {

        logoutBtnMobile.addEventListener(
            "click",
            logout
        );

    }

    // =========================
    // SPENDING TREND CHART
    // =========================

    const spendingCanvas =
        document.getElementById(
            "spendingChart"
        );

    if (spendingCanvas) {

        new Chart(
            spendingCanvas,
            {

                type: "line",

                data: {

                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun"
                    ],

                    datasets: [

                        {

                            label:
                                "Monthly Spending",

                            data: [
                                40000,
                                55000,
                                48000,
                                60000,
                                75000,
                                65000
                            ],

                            borderColor:
                                "#10b981",

                            backgroundColor:
                                "rgba(16,185,129,0.1)",

                            tension: 0.4,

                            fill: true

                        }

                    ]

                },

                options: {

                    responsive: true,

                    plugins: {

                        legend: {

                            display: false

                        }

                    }

                }

            }
        );

    }

    // =========================
    // EXPENSE CHART
    // =========================

    const expenseCanvas =
        document.getElementById(
            "expenseChart"
        );

    if (expenseCanvas) {

        new Chart(
            expenseCanvas,
            {

                type: "doughnut",

                data: {

                    labels: [

                        "Food",
                        "Transport",
                        "Bills",
                        "Savings",
                        "Entertainment"

                    ],

                    datasets: [

                        {

                            data: [

                                40,
                                20,
                                15,
                                15,
                                10

                            ],

                            backgroundColor: [

                                "#10b981",
                                "#06b6d4",
                                "#f59e0b",
                                "#8b5cf6",
                                "#ef4444"

                            ]

                        }

                    ]

                },

                options: {

                    responsive: true

                }

            }
        );

    }

});