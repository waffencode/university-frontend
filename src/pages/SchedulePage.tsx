import React from "react";
import AppPage from "../components/AppPage";
import "./SchedulePage.css";
import {LuMapPin, LuUniversity, LuUser, LuWatch} from "react-icons/lu";
import {Card, createListCollection, Heading, HStack, VStack} from "@chakra-ui/react";
import ScheduleClass from "../entities/domain/ScheduleClass.ts";

const classes = createListCollection<ScheduleClass>({items:
[

]});

const SchedulePage: React.FC = () => {
    return (
        <AppPage title="Расписание">
            <div>
                <div className="card-content">
                    <h2>Среда, 5 февраля 2025</h2>
                </div>
                <Card.Root className="class-card">
                    <Card.Header>
                        <Heading>1. Проектирование и архитектура программных систем</Heading>
                    </Card.Header>
                    <Card.Body>
                        <VStack alignItems="flex-start">
                            <HStack>
                                <LuWatch />9:00–10:35
                            </HStack>
                            <HStack>
                                <LuUniversity />Лекция<br/>
                            </HStack>
                            <HStack>
                                <LuUser />Иванов Иван Иванович<br/>
                            </HStack>
                            <HStack>
                                <LuMapPin />500/1
                            </HStack>
                        </VStack>
                    </Card.Body>
                </Card.Root>
            </div>
        </AppPage>
    )
}

export default SchedulePage;