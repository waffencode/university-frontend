import React, {useContext} from 'react';
import {HStack, IconButton, VStack} from "@chakra-ui/react";
import {LuLogOut} from "react-icons/lu";
import {UserContext} from "../service/UserProvider.tsx";

/**
 * Displays header information about the user.
 *
 * @author
 * waffencode@gmail.com
 */
export default function HeaderBar() {
    const context = useContext(UserContext);

    if (!context) {
        return null;
    }

    const {user} = context;

    // TODO: Replace divs with ChakraUI components.
    return (
        <div className="w-full h-16 shadow bg-white align-baseline p-2">
            <div className="w-full flex items-end justify-end align-text-top">
                {
                    user &&
                    <HStack gap={5}>
                        <VStack align='end' gap={1}>
                            <p className="font-bold">{user?.fullName}</p>
                            <p className="text-slate-500">{user?.email}</p>
                        </VStack>
                        <img className="w-16 h-14 object-cover rounded-full align-baseline"
                             src="" alt="User profile" />
                        <IconButton variant="ghost"><LuLogOut /></IconButton>
                    </HStack>
                }
            </div>
        </div>
    )
}