import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addIncome,
    addExpense,
    addAccount,
    updateIncome,
    updateAccount,
    updateExpense,
    removeIncome,
    removeExpenses,
    removeAccount
} from '../../redux';
import { INCOMES, EXPENSES, ACCOUNTS } from "../../constants";
import style from './add-operation-modal.module.css';

export const AddOperationModal = ({ onClose, type, shouldDeleteOrUpdate, operationData }) => {
    const [amount, setAmount] = useState(operationData.amount || "");
    const [description, setDescription] = useState(operationData.description || "");
    const [selectedCategory, setSelectedCategory] = useState(operationData.selectedCategory || "");
    const [selectedAccount, setSelectedAccount] = useState(operationData.accountId || "");
    const [isInitialCapital, setIsInitialCapital] = useState(operationData.isInitialCapital || false);

    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);

    useEffect(() => {
        setAmount(operationData?.amount || "");
        setDescription(operationData?.description || "");
        setSelectedCategory(operationData?.selectedCategory || "");
        setSelectedAccount(operationData?.accountId || "");
        setIsInitialCapital(operationData?.isInitialCapital || false)
    }, [operationData]);

    const categories = type === "income"
        ? INCOMES
        : type === "expense"
            ? EXPENSES
            : ACCOUNTS;

    const handleSubmit = () => {
        const accountId = selectedAccount || "others";
        const transactionData = {
            id: Date.now(),
            amount,
            description,
            selectedCategory: selectedCategory || categories.at(-1).category,
            type,
            accountId,
        };

        if (type === 'income') {
            dispatch(addIncome(transactionData));
        } else if (type === 'expense') {
            dispatch(addExpense(transactionData));
        } else if (type === 'account') {
            const accountData = {
                id: Date.now(),
                selectedCategory: selectedCategory || "Новый счет", // обязательно задаём имя счета
                amount: Number(amount),
                isInitialCapital,
                description // если нужно
            };
            dispatch(addAccount(accountData));
        }
        onClose();
    };

    const handleDelete = () => {
        switch (type) {
            case "income":
                dispatch(removeIncome(operationData.id));
                break;
            case "expense":
                dispatch(removeExpenses(operationData.id));
                break;
            case "account":
                dispatch(removeAccount(operationData.id));
                break;
            default:
                return;
        }

        onClose();
    }

    const handleUpdate = () => {
        const updatedData = {
            amount,
            description,
            selectedCategory: selectedCategory || categories.at(-1).category,
            type,
            accountId: selectedAccount || "others",
            ...(type === "account" && { isInitialCapital })
        };

        if (type === 'income') {
            dispatch(updateIncome({ id: operationData.id, updatedData }));
        } else if (type === 'expense') {
            dispatch(updateExpense({ id: operationData.id, updatedData }));
        } else if (type === 'account') {
            dispatch(updateAccount({ id: operationData.id, updatedData }));
        }
        onClose();
    }

    return (
        <div className={style.modalOverlay}>
            <div className={style.modal}>
                <h3 className={style.modalTitle}>{shouldDeleteOrUpdate ? "Редактировать операцию" : "Добавить операцию"}</h3>
                <input
                    type="number"
                    placeholder="Сумма"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={style.input}
                />
                <input
                    type="text"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={style.input}
                />
                <select
                    value={selectedCategory || categories.at(-1).category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={style.input}
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.category}>{cat.category}</option>
                    ))}
                </select>

                {(type === "income" || type === "expense") && (
                    <div className={style.inputContainer}>
                        <label className={style.inputLabel}>
                            {type === "income" ? "На какой счет зачислить:" : "С какого счета списать:"}
                        </label>
                        <select
                            value={selectedAccount}
                            onChange={(e) => setSelectedAccount(e.target.value)}
                            className={style.input}
                        >
                            <option value="">Прочие счета</option>
                            {accounts.map((acc) => (
                                <option key={acc.id} value={acc.id}>
                                    {acc.selectedCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {type === "account" && (
                    <label className={style.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={isInitialCapital}
                            onChange={(e) => setIsInitialCapital(e.target.checked)}
                        />
                        Стартовый капитал
                    </label>
                )}

                <div className={style.modalActions}>
                    <button className={style.cancelButton} onClick={onClose}>Отмена</button>
                    <button className={style.saveButton} onClick={shouldDeleteOrUpdate ? handleUpdate : handleSubmit}>Сохранить</button>
                    {shouldDeleteOrUpdate && <button className={style.deleteButton} onClick={handleDelete}>Удалить</button>}
                </div>
            </div>
        </div>
    );
};