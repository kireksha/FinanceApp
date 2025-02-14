import { Icon } from "../../../../components";
import style from "./category-item.module.css";
import { INCOMES, EXPENSES, ACCOUNTS } from "../../../../constants";
import { useSelector } from "react-redux";
export const CategoryItem = ({
    id,
    type,
    amount,
    description,
    selectedCategory,
    accountId,
    onEdit
}) => {
    const categories = type === "income"
        ? INCOMES
        : type === "expense"
            ? EXPENSES
            : ACCOUNTS;

    const reduxAccounts = useSelector((state) => state.accounts);

    let displayCategory = selectedCategory;
    if ((type === "income" || type === "expense") && accountId && accountId !== "others") {
        const foundAccount = reduxAccounts.find(acc => acc.id === accountId);
        if (foundAccount) {
            displayCategory = foundAccount.name;
        }
    }

    const currentCategory = categories.find(el => el.category === selectedCategory);
    const iconId = currentCategory ? currentCategory.icon : "fa-solid fa-wallet";

    function formatNumber(num) {
        return num
            .toFixed(2) // Округляем до двух знаков после запятой
            .replace(".", ",") // Заменяем точку на запятую
            .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Добавляем пробелы между тысячами
    }
    return (
        <li className={style.categoryItem}>
            <span className={style.categoryItem__selectedCategory}>{displayCategory}</span>
            <Icon
                className={style.categoryItem__icon}
                id={iconId}
                onClick={() => onEdit({ id, amount, description, selectedCategory, accountId })} />
            <span className={style.categoryItem__amount}>{formatNumber(Number(amount))} ₽</span>
            <span className={style.categoryItem__description}>{description}</span>
        </li>
    )
}