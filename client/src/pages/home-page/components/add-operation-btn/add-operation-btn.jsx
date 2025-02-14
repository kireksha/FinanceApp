import { Icon } from "../../../../components/icon/icon";
import styles from './add-operation-btn.module.css';

export const AddOperationBtn = ({ onAddOperation }) => {
    return (
        <button className={styles.addButton} onClick={onAddOperation}>
            <Icon id="fa-plus" />
        </button>
    );
};