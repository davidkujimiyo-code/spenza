document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();


    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!currentUser) {

        window.location.href =
            "./login.html";

        return;

    }

    const transactions =
    JSON.parse(
    localStorage.getItem(
    "transactions"
    )
    ) || [];


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

    // MOBILE DRAWER

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


    function updateDashboardStats() {

    const income = transactions
        .filter(
            item =>
            item.type === "income"
        )
        .reduce(
            (sum,item)=>
            sum + item.amount,
            0
        );

    const expenses = transactions
        .filter(
            item =>
            item.type === "expense"
        )
        .reduce(
            (sum,item)=>
            sum + item.amount,
            0
        );

    const balance =
        income - expenses;

    const savingsRate =
        income > 0
        ? Math.round(
            (balance / income) * 100
        )
        : 0;

    document.getElementById(
        "currentBalance"
    ).textContent =
    `₦${balance.toLocaleString()}`;

    document.getElementById(
        "totalIncome"
    ).textContent =
    `₦${income.toLocaleString()}`;

    document.getElementById(
        "totalExpense"
    ).textContent =
    `₦${expenses.toLocaleString()}`;

    document.getElementById(
        "savingsRate"
    ).textContent =
    `${savingsRate}%`;

    }


    // Recent Transaction

    function renderRecentTransactions() {

    const container =
        document.getElementById(
            "recentTransactions"
        );

    if (!container) return;

    container.innerHTML =
        transactions
            .slice(0, 5)
            .map(item => `

                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-3">

                        <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">

                            <i data-lucide="${item.icon || 'wallet'}"></i>

                        </div>

                        <div>

                            <p class="font-medium dark:text-white">

                                ${item.name}

                            </p>

                            <p class="text-xs text-slate-500">

                                ${item.category}

                            </p>

                        </div>

                    </div>

                    <span class="${
                        item.type === "income"
                            ? "text-emerald-500"
                            : "text-red-500"
                    } font-medium">

                        ${
                            item.type === "income"
                                ? "+"
                                : "-"
                        }

                        ₦${item.amount.toLocaleString()}

                    </span>

                </div>

            `)
            .join("");

    lucide.createIcons();

}

    // Budget Progress

    function updateBudgetProgress(){

    const income =
    transactions
    .filter(
        item =>
        item.type === "income"
    )
    .reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );

    const expenses =
    transactions
    .filter(
        item =>
        item.type === "expense"
    )
    .reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );

    const percent =
    income > 0
    ? Math.min(
        Math.round(
            (expenses / income) * 100
        ),
        100
    )
    : 0;

    document.getElementById(
        "budgetPercent"
    ).textContent =
    `${percent}%`;

    document.getElementById(
        "budgetBar"
    ).style.width =
    `${percent}%`;

    document.getElementById(
        "budgetNote"
    ).textContent =
    `₦${expenses.toLocaleString()} spent out of ₦${income.toLocaleString()} income`;

    }

    // SPENDING TREND CHART

    const incomeTotal =
    transactions
    .filter(
    item => item.type==="income"
    )
    .reduce(
    (sum,item)=>
    sum + item.amount,
    0
    );

    const expenseTotal =
    transactions
    .filter(
    item => item.type==="expense"
    )
    .reduce(
    (sum,item)=>
    sum + item.amount,
    0
    );

    new Chart(
    document.getElementById(
    "spendingChart"
    ),
    {
    type:"bar",
    data:{
    labels:[
    "Income",
    "Expenses"
    ],
    datasets:[{
    data:[
    incomeTotal,
    expenseTotal
    ]
    }]
    }
    }
    );

    new Chart(
    document.getElementById(
    "expenseChart"
    ),
    {
    type:"doughnut",
    data:{
    labels:[
    "Income",
    "Expenses"
    ],
    datasets:[{
    data:[
    incomeTotal,
    expenseTotal
    ]
    }]
    }
    }
    );

    updateDashboardStats();

    renderRecentTransactions();

    updateBudgetProgress();

    const fabButton =
    document.getElementById("fabButton");

    const fabMenu =
    document.getElementById("fabMenu");

    const fabIcon =
    document.getElementById("fabIcon");

    fabButton?.addEventListener("click", () => {

    if (fabMenu.classList.contains("hidden")) {

        fabMenu.classList.remove("hidden");

        setTimeout(() => {

            fabMenu.classList.remove("opacity-0");
            fabMenu.classList.remove("translate-y-4");
            fabMenu.classList.add("flex");

        }, 10);

    } else {

        fabMenu.classList.add("opacity-0");
        fabMenu.classList.add("translate-y-4");

        setTimeout(() => {

            fabMenu.classList.add("hidden");
            fabMenu.classList.remove("flex");

        }, 300);

    }

});

lucide.createIcons();

});