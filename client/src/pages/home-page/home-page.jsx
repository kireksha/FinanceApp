import { Icon, AddOperationModal, CategoryItem } from "../../components";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./home-page.module.css";

export const HomePage = ({ userData, loading }) => {
  const [isIncomesOpen, setIncomesOpen] = useState(false);
  const [isExpensesOpen, setExpensesOpen] = useState(false);
  const [isAccountsOpen, setAccountsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('')


  const handleOpenModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  }

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
            Добро пожаловать, {userData.email}!
          </h1>
        </div>
      ) : (
        <h1 className={style.errorMessage}>Ошибка при загрузке данных</h1>
      )}
      <div className={style.content}>
        <div className={style.pageTitle}>Главная страница</div>

        {isModalOpen && <AddOperationModal onClose={() => setModalOpen(false)} type={modalType} />}

        <div onClick={toggleIncomes} className={style.categoriesSectionHeader}>
          <h2>Доходы</h2>
          <Icon id={isIncomesOpen ? "fa-chevron-up" : "fa-chevron-down"} />
        </div>
        {isIncomesOpen && (
          <div className={style.categoriesList}>
            <ul>
              {incomes.map((incomes, index) => {
                return <li key={index}>{`${incomes.amount} - ${incomes.description}`}</li>
              })}
              <CategoryItem category="Доходы" onAddOperation={() => handleOpenModal("income")} />
            </ul>
          </div>
        )}

        {/* Расходы */}
        <div onClick={toggleExpenses} className={style.categoriesSectionHeader}>
          <h2>Расходы</h2>
          <Icon id={isExpensesOpen ? "fa-chevron-up" : "fa-chevron-down"} />
        </div>
        {isExpensesOpen && (
          <div className={style.categoriesList}>
            <ul>
              {expenses.map((expense, index) => (
                <li key={index}>{`${expense.amount} - ${expense.description}`}</li>
              ))}
              <CategoryItem category="Расходы" onAddOperation={() => handleOpenModal("expense")} />
            </ul>
            {/* Добавить остальные элементы для расходов */}
          </div>
        )}

        {/* Счета */}
        <div onClick={toggleAccounts} className={style.categoriesSectionHeader}>
          <h2>Счета</h2>
          <Icon id={isAccountsOpen ? "fa-chevron-up" : "fa-chevron-down"} />
        </div>
        {isAccountsOpen && (
          <div className={style.categoriesList}>
            <ul>
              {accounts.map((account, index) => (
                <li key={index}>{`${account.amount} - ${account.description}`}</li>
              ))}
              <CategoryItem category="Счета" onAddOperation={() => handleOpenModal("account")} />
            </ul>
            {/* Добавить остальные элементы для счетов */}
          </div>
        )}
      </div>
    </div>
  );
};
