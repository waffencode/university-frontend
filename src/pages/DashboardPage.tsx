import React from "react";
import AppPage from "../components/AppPage.tsx";

const DashboardPage: React.FC = () => {
    return (
        <AppPage title="University">
            Информационная система “Университет” (“University”) для студентов и преподавателей
            университета.<br/><br/>

            Задача системы — обеспечение студентов ВУЗа информацией о ходе образовательного процесса,
            интеграция функционала рабочих мест студента, преподавателя и методиста в едином сервисе.
        </AppPage>
    );
}

export default DashboardPage;
