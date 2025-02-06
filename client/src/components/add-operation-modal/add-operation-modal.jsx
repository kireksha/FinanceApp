import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIncome, addExpense, addAccount } from '../../redux';
import style from './add-operation-modal.module.css';

export const AddOperationModal = ({ onClose, category, type }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(category || "");
    const dispatch = useDispatch();

    const categories = type === "income"
        ? [
            "Зарплата", "Премия", "Фриланс", "Доход от бизнеса", "Пассивный доход",
            "Аренда", "Проценты по вкладам", "Дивиденды", "Социальные выплаты",
            "Подарки и переводы", "Кэшбэк и бонусы", "Продажа вещей", "Возврат налогов", "Прочие доходы"
        ]
        : type === "expense"
            ? [
                "Продукты питания", "Транспорт", "Жилищные расходы", "Связь", "Развлечения",
                "Одежда и обувь", "Медицина", "Образование", "Спортивные занятия",
                "Подарки и благотворительность", "Кредиты и займы", "Домашние животные", "Автозатраты", "Прочие расходы"
            ]
            : [
                "Счет для расчетов", "Счет для сбережений", "Долг", "Депозитный счет",
                "Счет для инвестиций", "Кредитная карта", "Платежи и переводы",
                "Блокировка средств", "Иностранный счет", "Прочие счета"
            ];

    const handleSubmit = () => {
        const transactionData = { amount, description, selectedCategory, type };
        if (type === 'income') {
            dispatch(addIncome(transactionData));
        } else if (type === 'expense') {
            dispatch(addExpense(transactionData));
        } else if (type === 'account') {
            dispatch(addAccount(transactionData));
        }
        onClose();
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modal}>
                <h3 className={style.modalTitle}>Добавить операцию</h3>
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
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={style.input}
                >
                    <option value="">Выберите категорию</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <div className={style.modalActions}>
                    <button className={style.cancelButton} onClick={onClose}>Отмена</button>
                    <button className={style.saveButton} onClick={handleSubmit}>Сохранить</button>
                </div>
            </div>
        </div>
    );
};