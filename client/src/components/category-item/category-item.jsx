import { Icon } from "../icon/icon";
import styles from './category-item.module.css';

export const CategoryItem = ({ category, onAddOperation }) => {
    return (
        <div className={styles.categoryItem}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            <button className={styles.addButton} onClick={onAddOperation}>
                <Icon id="fa-plus" />
                Добавить операцию
            </button>
        </div>
    );
};