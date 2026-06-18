document.addEventListener("DOMContentLoaded", () => {


    lucide.createIcons();

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.documentElement.classList.add("dark");

    }

    const themeToggle =
        document.getElementById("themeToggle");

    const mobileThemeToggle =
        document.getElementById("mobileThemeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    const mobileThemeIcon =
        document.getElementById("mobileThemeIcon");

    function updateThemeIcons() {

        const darkMode =
            document.documentElement.classList.contains("dark");

        if (themeIcon) {

            themeIcon.setAttribute(
                "data-lucide",
                darkMode ? "sun" : "moon"
            );

        }

        if (mobileThemeIcon) {

            mobileThemeIcon.setAttribute(
                "data-lucide",
                darkMode ? "sun" : "moon"
            );

        }

        lucide.createIcons();

    }

    function toggleTheme() {

        document.documentElement.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.documentElement.classList.contains("dark")
                ? "dark"
                : "light"
        );

        updateThemeIcons();

    }

    themeToggle?.addEventListener(
        "click",
        toggleTheme
    );

    mobileThemeToggle?.addEventListener(
        "click",
        toggleTheme
    );

    updateThemeIcons();


    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mobileDrawer =
        document.getElementById("mobileDrawer");

    const drawerOverlay =
        document.getElementById("drawerOverlay");

    function openDrawer() {

        mobileDrawer.classList.remove("-translate-x-full");

        drawerOverlay.classList.remove("hidden");

    }

    function closeDrawer() {

        mobileDrawer.classList.add("-translate-x-full");

        drawerOverlay.classList.add("hidden");

    }

    mobileMenuBtn?.addEventListener(
        "click",
        openDrawer
    );

    drawerOverlay?.addEventListener(
        "click",
        closeDrawer
    );


    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    const userAvatar =
        document.getElementById("userAvatar");

    if (currentUser && userAvatar) {

        const initials =
            currentUser.fullName
                .split(" ")
                .map(name => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

        userAvatar.textContent =
            initials;

    }


    const logoutBtn =
        document.getElementById("logoutBtn");

    const logoutBtnMobile =
        document.getElementById("logoutBtnMobile");

    function logout() {

        localStorage.removeItem(
            "currentUser"
        );

        window.location.href =
            "./login.html";

    }

    logoutBtn?.addEventListener(
        "click",
        logout
    );

    logoutBtnMobile?.addEventListener(
        "click",
        logout
    );


    let transactions =
    JSON.parse(
    localStorage.getItem(
    "transactions"
    )
    ) || [

    {
        name:"Salary Payment",
        amount:350000,
        type:"income",
        category:"Salary",
        icon:"wallet",
        date:"Today"
    },

    {
        name:"Netflix Subscription",
        amount:7500,
        type:"expense",
        category:"Entertainment",
        icon:"film",
        date:"Yesterday"
    }

    ];


    const container =
        document.getElementById(
            "transactionsContainer"
        );

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const filterType =
        document.getElementById(
            "filterType"
        );

    const totalIncome =
        document.getElementById(
            "totalIncome"
        );

    const totalExpense =
        document.getElementById(
            "totalExpense"
        );

    const totalSavings =
        document.getElementById(
            "totalSavings"
        );

    const totalTransactions =
        document.getElementById(
            "totalTransactions"
        );


    function updateStats() {

        const income =
            transactions
                .filter(
                    item => item.type === "income"
                )
                .reduce(
                    (sum, item) =>
                        sum + item.amount,
                    0
                );

        const expense =
            transactions
                .filter(
                    item => item.type === "expense"
                )
                .reduce(
                    (sum, item) =>
                        sum + item.amount,
                    0
                );

        totalIncome.textContent =
            `₦${income.toLocaleString()}`;

        totalExpense.textContent =
            `₦${expense.toLocaleString()}`;

        totalSavings.textContent =
            `₦${(income - expense).toLocaleString()}`;

        totalTransactions.textContent =
            transactions.length;

    }


    function renderTransactions() {

        const search =
            searchInput.value.toLowerCase();

        const filter =
            filterType.value;

        const filtered =
            transactions.filter(item => {

                const matchSearch =
                    item.name
                        .toLowerCase()
                        .includes(search);

                const matchType =
                    filter === "all"
                        ? true
                        : item.type === filter;

                return (
                    matchSearch &&
                    matchType
                );

            });

        if (filtered.length === 0) {

            container.innerHTML = `

                <div class="bg-white dark:bg-slate-900 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-800">

                    <i data-lucide="search-x"
                    class="w-12 h-12 mx-auto text-slate-400 mb-3"></i>

                    <h3 class="font-semibold">
                        No Transactions Found
                    </h3>

                </div>

            `;

            lucide.createIcons();

            return;

        }

        container.innerHTML =
            filtered.map(item => `

                <div
                    onclick="
                    window.location.href='./add-transaction.html?id=${item.id}&type=${item.type}'"
                    class="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">

                    <div class="flex items-center justify-between">

                        <div class="flex items-center gap-4">

                            <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">

                                <i
                                    data-lucide="${item.icon}"
                                    class="text-emerald-500">
                                </i>

                            </div>

                            <div>

                                <h3 class="font-semibold">

                                    ${item.name}

                                </h3>

                                <p class="text-sm text-slate-500">

                                    ${item.category}
                                    •
                                    ${item.date}

                                </p>

                            </div>

                        </div>

                        <div class="flex items-center gap-4">

                            <div class="${
                                item.type === "income"
                                    ? "text-emerald-500"
                                    : "text-red-500"
                            } font-bold">

                                ${
                                    item.type === "income"
                                        ? "+"
                                        : "-"
                                }

                                ₦${item.amount.toLocaleString()}

                            </div>

                            <div
                                class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-cyan-500/10 hover:scale-110 transition-all duration-300">

                                <i
                                    data-lucide="square-pen"
                                    class="w-4 h-4 text-cyan-400">
                                </i>

                            </div>

                        </div>

                    </div>

                </div>

            `).join("");

        lucide.createIcons();

    }


    searchInput?.addEventListener(
        "input",
        renderTransactions
    );

    filterType?.addEventListener(
        "change",
        renderTransactions
    );


    const incomeTotal =
    transactions
        .filter(
            item => item.type === "income"
        )
        .reduce(
            (sum, item) =>
                sum + item.amount,
            0
        );

    const expenseTotal =
    transactions
        .filter(
            item => item.type === "expense"
        )
        .reduce(
            (sum, item) =>
                sum + item.amount,
            0
        );


    const trendChart =
        document.getElementById(
            "spendingTrendChart"
        );

    if (trendChart) {

        new Chart(trendChart, {

            type: "line",

            data: {

                labels: [
                "Income",
                "Expenses"
                ],

                datasets: [{

                    label: "Spending",

                    data: [
                    incomeTotal,
                    expenseTotal
                    ],

                    borderColor: "#10b981",

                    backgroundColor:
                        "rgba(16,185,129,.15)",

                    fill: true,

                    tension: .4

                }]

            }

        });

    }

    const breakdownChart =
        document.getElementById(
            "expenseBreakdownChart"
        );

    if (breakdownChart) {

        new Chart(breakdownChart, {

            type: "doughnut",

            data: {

                labels: [
                "Income",
                "Expenses"
                ],

                datasets: [{

                    data: [
                    incomeTotal,
                    expenseTotal
                    ],

                    backgroundColor: [
                        "#10b981",
                        "#06b6d4",
                        "#8b5cf6",
                        "#f59e0b",
                        "#ef4444"
                    ]

                }]

            }

        });

    }

    function renderRecentActivity() {

    const recentActivity =
        document.getElementById(
            "recentActivity"
        );

    if (!recentActivity) return;

    recentActivity.innerHTML =
        transactions
            .slice(0, 5)
            .map(item => `

                <div class="flex items-center justify-between py-3 border-b border-slate-800">

                    <div>

                        <p class="font-medium">

                            ${item.name}

                        </p>

                        <p class="text-xs text-slate-500">

                            ${item.category}

                        </p>

                    </div>

                    <span class="${
                        item.type === "income"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }">

                        ${
                            item.type === "income"
                            ? "+"
                            : "-"
                        }

                        ₦${item.amount.toLocaleString()}

                    </span>

                </div>

            `).join("");

}

    updateStats();

    renderTransactions();

    renderRecentActivity();

});