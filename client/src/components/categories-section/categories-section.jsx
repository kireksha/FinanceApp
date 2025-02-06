import { useState } from "react";
import { useSelector } from "react-redux";
import { AddOperationModal } from "../add-operation-modal/add-operation-modal";
import style from "./categories-section.module.css";

export const CategoriesSection = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('')
    const handleOpenModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    }

    const accounts = useSelector((state) => state.accounts);
    const incomes = useSelector((state) => state.incomes);
    const expenses = useSelector((state) => state.expenses);

    return (
        <section className={style.categoriesSection}>
            <h2 className={style.sectionTitle}>Категории</h2>
            <div className={style.categoriesList}>
                {/* <CategoryItem category="Доходы" onAddOperation={() => handleOpenModal("income")} />
                <CategoryItem category="Расходы" onAddOperation={() => handleOpenModal("expense")} />
                <CategoryItem category="Счета" onAddOperation={() => handleOpenModal("account")} /> */}
            </div>

            {isModalOpen && <AddOperationModal onClose={() => setModalOpen(false)} type={modalType} />}
            <ul>
                {incomes.map((incomes, index) => {
                    return <li key={index}>{`${incomes.amount} - ${incomes.description}`}</li>
                })}
            </ul>
            {/* Отображение расходов */}
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>{`${expense.amount} - ${expense.description}`}</li>
                ))}
            </ul>

            {/* Отображение счетов */}
            <ul>
                {accounts.map((account, index) => (
                    <li key={index}>{`${account.amount} - ${account.description}`}</li>
                ))}
            </ul>
        </section>
    )
}