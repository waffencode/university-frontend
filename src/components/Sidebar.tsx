import React from "react";
import {Box, Group, IconButton, VStack} from "@chakra-ui/react";
import {Button} from "./ui/button.tsx";
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

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };


    // TODO: Refactor.
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
                        <IconButton justifyContent={!isCollapsed ? 'flex-start' : 'center'} minW="90%" variant="ghost"><LuHome />{!isCollapsed && "Главная"}</IconButton>
                        <IconButton justifyContent={!isCollapsed ? 'flex-start' : 'center'} minW="90%" variant="ghost"><LuCalendarClock />{!isCollapsed && "Расписание"}</IconButton>
                        <IconButton justifyContent={!isCollapsed ? 'flex-start' : 'center'} minW="90%" variant="ghost"><LuSchool />{!isCollapsed && "Занятия"}</IconButton>
                        <IconButton justifyContent={!isCollapsed ? 'flex-start' : 'center'} minW="90%" variant="ghost"><LuMessageCircle />{!isCollapsed && "Сообщения"}</IconButton>
                        <IconButton justifyContent={!isCollapsed ? 'flex-start' : 'center'} minW="90%" variant="ghost"><LuSettings />{!isCollapsed && "Настройки"}</IconButton>
                        <IconButton justifyContent={!isCollapsed ? 'flex-start' : 'center'} minW="90%" variant="ghost"><LuLogOut />{!isCollapsed && "Выход"}</IconButton>
                    </VStack>
                </VStack>
            </Box>
        </Box>
    )
}

export default Sidebar;