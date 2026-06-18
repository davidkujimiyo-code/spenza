document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();
    
    renderRecentActivity();

    const params =
        new URLSearchParams(
            window.location.search
        );

    const type =
        params.get("type") || "expense";

    const editId =
    params.get("id");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageSubtitle =
        document.getElementById("pageSubtitle");

    if (type === "income") {

        pageTitle.textContent =
            "Add Income";

        pageSubtitle.textContent =
            "Record a new income source.";

    } else {

        pageTitle.textContent =
            "Add Expense";

        pageSubtitle.textContent =
            "Record a new expense.";

    }

    const form =
        document.getElementById(
            "transactionForm"
        );

    const formMessage =
        document.getElementById(
            "formMessage"
        );


    const deleteBtn =
    document.getElementById(
        "deleteBtn"
    );

    let editingTransaction = null;

    if (editId) {

    const transactions =
        JSON.parse(
            localStorage.getItem(
                "transactions"
            )
        ) || [];

    editingTransaction =
        transactions.find(
            item => item.id == editId
        );

    if (editingTransaction) {

        document.getElementById(
            "transactionName"
        ).value =
            editingTransaction.name;

        document.getElementById(
            "transactionAmount"
        ).value =
            editingTransaction.amount;

        document.getElementById(
            "transactionCategory"
        ).value =
            editingTransaction.category;

        pageTitle.textContent =
            "Edit Transaction";

        pageSubtitle.textContent =
            "Update transaction details.";

        deleteBtn.classList.remove(
            "hidden"
        );
    }
}

    form.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            const name =
                document.getElementById(
                    "transactionName"
                ).value;

            const amount =
                Number(
                    document.getElementById(
                        "transactionAmount"
                    ).value
                );

            const category =
                document.getElementById(
                    "transactionCategory"
                ).value;

            if (!name || !amount) {

                formMessage.classList.remove(
                    "hidden"
                );

                formMessage.className =
                    "rounded-xl px-4 py-3 text-sm font-medium bg-red-100 text-red-700";

                formMessage.textContent =
                    "Please complete all fields.";

                return;

            }

            const transactions =
                JSON.parse(
                    localStorage.getItem(
                        "transactions"
                    )
                ) || [];

            const icons = {

                Salary: "wallet",
                Food: "utensils-crossed",
                Transport: "car",
                Entertainment: "film",
                Shopping: "shopping-bag",
                Bills: "receipt"

            };

            const transaction = {

            id: editId
                ? Number(editId)
                : Date.now(),

            name,

            amount,

            category,

            type,

            icon:
                icons[category] ||
                "wallet",

            date:
                new Date()
                .toLocaleDateString()

        };

        if (editId) {

            const index =
                transactions.findIndex(
                    item => item.id == editId
                );

            if (index !== -1) {

                transactions[index] =
                    transaction;

            }

        } else {

            transactions.unshift(
                transaction
            );

        }

            localStorage.setItem(
                "transactions",
                JSON.stringify(
                    transactions
                )
            );

            window.location.href =
                "./transactions.html";

        }
    );

    function renderRecentActivity() {

    const container =
        document.getElementById(
            "recentActivity"
        );

    if (!container) return;

    const transactions =
        JSON.parse(
            localStorage.getItem(
                "transactions"
            )
        ) || [];

    const recent =
        transactions.slice(0, 5);

    container.innerHTML =
        recent.map(item => `

        <div class="flex justify-between">

            <span>
                ${item.name}
            </span>

            <span class="${
                item.type === "income"
                    ? "text-emerald-500"
                    : "text-red-500"
            }">

                ${
                    item.type === "income"
                        ? "+"
                        : "-"
                }₦${item.amount.toLocaleString()}

            </span>

        </div>

    `).join("");

    }

    deleteBtn?.addEventListener(
    "click",
    () => {

        if (
            !confirm(
                "Delete this transaction?"
            )
        ) return;

        let transactions =
            JSON.parse(
                localStorage.getItem(
                    "transactions"
                )
            ) || [];

        transactions =
            transactions.filter(
                item => item.id != editId
            );

        localStorage.setItem(
            "transactions",
            JSON.stringify(
                transactions
            )
        );

        window.location.href =
            "./transactions.html";

    }
);

});