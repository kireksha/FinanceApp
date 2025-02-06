import { SpendingChart } from "../../components";
import style from "./statistics-page.module.css";

export const StatisticsPage = () => {
  return (
    <div className={style.page}>
      <h2>Статистика расходов</h2>
      <SpendingChart />
    </div>
  );
};
