import React from "react";
import {Box, IconButton, VStack} from "@chakra-ui/react";
import './Sidebar.css';
import {
    LuCalendarClock,
    LuChevronsLeft,
    LuChevronsRight, LuHome,
    LuLogOut,
    LuMessageCircle,
    LuSchool,
    LuSettings
} from "react-icons/lu";
import SidebarButton from "./SidebarButton.tsx";

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Box>
            <Box marginY={2} shadow="md" rounded={3} p={4} bg="white" h="100%" className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <VStack w="100%" minH="200vh">
                    <VStack minW="100%" gap={1} className="sticky_button">
                        <IconButton minW="90%" variant="ghost" onClick={() => toggleSidebar()}>
                            {
                                isCollapsed ? <LuChevronsRight /> : <LuChevronsLeft />
                            }
                        </IconButton>
                        <SidebarButton
                            icon={<LuHome />}
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
                            icon={<LuMessageCircle />}
                            label="Сообщения"
                            isCollapsed={isCollapsed}
                        />
                        <SidebarButton
                            icon={<LuSettings />}
                            label="Настройки"
                            isCollapsed={isCollapsed}
                        />
                        <SidebarButton
                            icon={<LuLogOut />}
                            label="Выход"
                            isCollapsed={isCollapsed}
                        />
                    </VStack>
                </VStack>
            </Box>
        </Box>
    )
}

export default Sidebar;