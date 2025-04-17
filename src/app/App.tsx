import { Toaster } from "@/components/ui/toaster";
import SchedulingPage from "@/pages/classes/SchedulingPage";
import SubjectWorkProgramDetails from "@/pages/classes/subject-work-program/SubjectWorkProgramDetails";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import React from "react";
import "./App.css";
import { CookiesProvider } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/AdminPage.tsx";
import ClassesPage from "../pages/classes/ClassesPage.tsx";
import CreateSubjectWorkProgramPage from "../pages/classes/subject-work-program/CreateSubjectWorkProgramPage.tsx";
import EditSubjectWorkProgramPage from "../pages/classes/subject-work-program/EditSubjectWorkProgramPage.tsx";
import CreateSubjectPage from "../pages/classes/subject/CreateSubjectPage.tsx";
import EditSubjectPage from "../pages/classes/subject/EditSubjectPage.tsx";
import IndexPage from "../pages/IndexPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import MessagesPage from "../pages/MessagesPage.tsx";
import RegistrationConfirmationPage from "../pages/RegistrationConfirmationPage.tsx";
import RegistrationPage from "../pages/RegistrationPage.tsx";
import SchedulePage from "../pages/SchedulePage.tsx";
import SettingsPage from "../pages/SettingsPage.tsx";
import ApiProvider from "../service/ApiProvider.tsx";
import UserProvider from "../service/UserProvider.tsx";

const App: React.FC = () => {
	return (
		<>
			<CookiesProvider>
				<ApiProvider>
					<UserProvider>
						<Routes>
							<Route path="/" element={<IndexPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route
								path="/register"
								element={<RegistrationPage />}
							/>
							<Route
								path="/register/confirm"
								element={<RegistrationConfirmationPage />}
							/>
							<Route
								path="/dashboard"
								element={<DashboardPage />}
							/>
							<Route path="/admin" element={<AdminPage />} />
							<Route
								path="/settings"
								element={<SettingsPage />}
							/>
							<Route
								path="/messages"
								element={<MessagesPage />}
							/>
							<Route
								path="/messages/:messageId"
								element={<MessagesPage />}
							/>
							<Route
								path="/schedule"
								element={<SchedulePage />}
							/>
							<Route path="/classes" element={<ClassesPage />} />
							<Route
								path="/classes/subjects/create"
								element={<CreateSubjectPage />}
							/>
							<Route
								path="/classes/subjects/edit/:subjectId"
								element={<EditSubjectPage />}
							/>
							<Route
								path="/classes/subjectWorkPrograms/create"
								element={<CreateSubjectWorkProgramPage />}
							/>
							<Route
								path="/classes/subjectWorkPrograms/view/:subjectWorkProgramId"
								element={<SubjectWorkProgramDetails />}
							/>
							<Route
								path="/classes/subjectWorkPrograms/edit/:subjectWorkProgramId"
								element={<EditSubjectWorkProgramPage />}
							/>
							<Route
								path="/classes/scheduling"
								element={<SchedulingPage />}
							/>
						</Routes>
						<Toaster />
					</UserProvider>
				</ApiProvider>
			</CookiesProvider>
		</>
	);
};

export default App;
