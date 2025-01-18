import React, {useContext} from "react";
import {Box, IconButton, VStack} from "@chakra-ui/react";
import './Sidebar.css';
import {
    LuAppWindow,
    LuCalendarClock,
    LuChevronsLeft,
    LuChevronsRight, LuHouse,
    LuLogOut,
    LuMessageCircle,
    LuSchool,
    LuSettings
} from "react-icons/lu";
import SidebarButton from "./SidebarButton.tsx";
import {ApiContext} from "../service/ApiProvider.tsx";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {UserContext} from "../service/UserProvider.tsx";

const Sidebar: React.FC = () => {
    const apiContext = useContext(ApiContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

    const [, , removeCookies] = useCookies(["token"]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const onHomeButtonClick = () => {
        navigate("/dashboard");
    }

    const onLogoutButtonClick = () => {
        apiContext.user.logout().then(() => {
            removeCookies("token");
            userContext?.setUser(null);
            navigate("/");
        })
    }

    const onAdminPanelButtonClick = () => {
        navigate("/admin");
    }

    const onSettingsButtonClick = () => {
        navigate("/settings");
    }

    const onMessagesButtonClick = () => {
        navigate("/messages");
    }

    return (
            <Box shadow="md" rounded={3} p={4} bg="white" h="100%" className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <VStack w="100%" minH="100vh">
                    <VStack minW="100%" gap={1} className="sticky_button">
                        <IconButton minW="90%" variant="ghost" onClick={() => toggleSidebar()}>
                            {
                                isCollapsed ? <LuChevronsRight /> : <LuChevronsLeft />
                            }
                        </IconButton>
                        <SidebarButton
                            onClick={onHomeButtonClick}
                            icon={<LuHouse />}
                            label="Главная"
                            isCollapsed={isCollapsed}
                        />
                        <SidebarButton
                            icon={<LuCalendarClock />}
                            label="Расписание"
                            isCollapsed={isCollapsed}
                        />
                        <SidebarButton
                            icon={<LuSchool />}
                            label="Занятия"
                            isCollapsed={isCollapsed}
                        />
                        <SidebarButton
                            onClick={onMessagesButtonClick}
                            icon={<LuMessageCircle />}
                            label="Сообщения"
                            isCollapsed={isCollapsed}
                        />
                        <SidebarButton
                            onClick={onSettingsButtonClick}
                            icon={<LuSettings />}
                            label="Настройки"
                            isCollapsed={isCollapsed}
                        />
                        <SidebarButton
                            onClick={onAdminPanelButtonClick}
                            icon={<LuAppWindow />}
                            label="Админ-панель"
                            isCollapsed={isCollapsed}
                        />
                        <SidebarButton
                            onClick={onLogoutButtonClick}
                            icon={<LuLogOut />}
                            label="Выход"
                            isCollapsed={isCollapsed}
                        />
                    </VStack>
                </VStack>
            </Box>
    )
}

export default Sidebar;