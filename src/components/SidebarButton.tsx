import { HStack, IconButton } from "@chakra-ui/react";
import React from "react";

interface SidebarButtonProps {
	icon: React.ReactNode;
	label: string;
	isCollapsed: boolean;
	onClick?: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
	icon,
	label,
	isCollapsed,
	onClick,
}) => {
	return (
		<IconButton
			justifyContent={!isCollapsed ? "flex-start" : "center"}
			minW="90%"
			variant="ghost"
			onClick={onClick}
		>
			<HStack gap={2} m={2}>
				{icon}
				{!isCollapsed && label}
			</HStack>
		</IconButton>
	);
};

export default SidebarButton;
