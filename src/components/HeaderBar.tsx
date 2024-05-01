import React from 'react';
import {HStack, Icon, VStack} from "@chakra-ui/react";
import { BsBoxArrowRight } from "react-icons/bs";

/**
 * Displays header information about the user.
 *
 * Used in: admin dashboard.
 *
 * @example
 * <HeaderBar />
 *
 * @author
 * waffencode@gmail.com
 */
export default function HeaderBar() {
    return (
        <div className="w-full h-26 shadow bg-white align-baseline p-2">
            <div className="w-full flex items-end justify-end align-text-top">
                <HStack spacing={5}>
                    <VStack align='end' spacing={1}>
                        <p className="font-bold">John Doe</p>
                        <p className="text-slate-500">john.doe@gmail.com</p>
                    </VStack>
                    <img className="w-16 rounded-full align-baseline"
                         src="" alt="User profile"></img>
                    <Icon as={BsBoxArrowRight} w={24} boxSize={10} />
                </HStack>
            </div>
        </div>
    )
}