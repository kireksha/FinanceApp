import { Icon, AddOperationModal } from "../../components";
import { AddOperationBtn, CategoryItem } from "./components";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./home-page.module.css";

export const HomePage = ({ userData, loading }) => {
  const [isIncomesOpen, setIncomesOpen] = useState(false);
  const [isExpensesOpen, setExpensesOpen] = useState(false);
  const [isAccountsOpen, setAccountsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState(null);
  const [shouldDeleteOrUpdate, setShouldDeleteOrUpdate] = useState(false);

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setModalData(data || { id: "", amount: "", description: "", selectedCategory: "" });
    setShouldDeleteOrUpdate(!!data)
    setModalOpen(true);
  };

  const toggleIncomes = () => setIncomesOpen((prevState) => !prevState);
  const toggleExpenses = () => setExpensesOpen((prevState) => !prevState);
  const toggleAccounts = () => setAccountsOpen((prevState) => !prevState);

  const accounts = useSelector((state) => state.accounts);
  const incomes = useSelector((state) => state.incomes.list);
  const expenses = useSelector((state) => state.expenses.list);

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <h1>Загрузка...</h1>
        <div className={style.spinner}></div>
      </div>
    );
  }

  return (
    <div className={style.homePage}>
      {userData ? (
        <div className={style.welcomeSection}>
          <h1 className={style.welcomeText}>
            Добро пожаловать, <span>{userData.login}</span>!
          </h1>
        </div>
      ) : (
        <h1 className={style.errorMessage}>Ошибка при загрузке данных</h1>
      )}
      <div className={style.content}>
        {isModalOpen && (
          <AddOperationModal
            onClose={() => setModalOpen(false)}
            type={modalType}
            operationData={modalData}
            shouldDeleteOrUpdate={shouldDeleteOrUpdate}
          />
        )}

        <div onClick={toggleIncomes} className={style.categoriesSectionHeader}>
          <h2>Доходы</h2>
          <Icon className={style.shevronIcon} id={isIncomesOpen ? "fa-chevron-up" : "fa-chevron-down"} />
        </div>
        {isIncomesOpen && (
          <ul className={style.categoriesList}>
            {incomes.map((income) => {
              return <CategoryItem
                key={income.id}
                id={income.id}
                type={"income"}
                amount={income.amount}
                description={income.description}
                selectedCategory={income.selectedCategory}
                accountId={income.accountId}
                onEdit={(data) => handleOpenModal("income", data)}
              />
            })}
            <li className={style.categoriesList__addOperationBtn}>
              <AddOperationBtn onAddOperation={() => handleOpenModal("income")} />
            </li>
          </ul>
        )}

        {/* Расходы */}
        <div onClick={toggleExpenses} className={style.categoriesSectionHeader}>
          <h2>Расходы</h2>
          <Icon className={style.shevronIcon} id={isExpensesOpen ? "fa-chevron-up" : "fa-chevron-down"} />
        </div>
        {isExpensesOpen && (
          <ul className={style.categoriesList}>
            {expenses.map((expense) => (
              <CategoryItem
                key={expense.id}
                id={expense.id}
                type="expense"
                amount={expense.amount}
                description={expense.description}
                selectedCategory={expense.selectedCategory}
                accountId={expense.accountId}
                onEdit={(data) => handleOpenModal("expense", data)}
              />
            ))}
            <AddOperationBtn onAddOperation={() => handleOpenModal("expense")} />
          </ul>
        )}

        {/* Счета */}
        <div onClick={toggleAccounts} className={style.categoriesSectionHeader}>
          <h2>Счета</h2>
          <Icon className={style.shevronIcon} id={isAccountsOpen ? "fa-chevron-up" : "fa-chevron-down"} />
        </div>
        {isAccountsOpen && (
          <ul className={style.categoriesList}>
            {accounts.map((account) => (
              <CategoryItem
                key={account.id}
                id={account.id}
                type="account"
                amount={account.amount}
                description={account.description}
                selectedCategory={account.selectedCategory}
                onEdit={(data) => handleOpenModal("account", data)}
              />
            ))}
            <AddOperationBtn onAddOperation={() => handleOpenModal("account")} />
          </ul>
        )}
      </div>
    </div>
  );
};
