import {Box, Button, Flex, HStack, IconButton, Input, Pagination, Table} from "@chakra-ui/react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import React, {useContext, useEffect, useMemo, useState} from "react";
import Subject from "../../../entities/domain/Subject";
import {ApiContext} from "../../../service/ApiProvider.tsx";
import {useNavigate} from "react-router-dom";

const SubjectsView: React.FC = () => {
    const apiContext = useContext(ApiContext);
    const navigate = useNavigate();

    const [data, setData] = useState<Subject[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const filteredData = useMemo(() => {
        return data.filter((subject) =>
            subject.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const handleAddSubject = () => {
        navigate("/classes/subjects/create");
    }

    // Pagination logic
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage, itemsPerPage]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    useEffect(() => {
    const fetchSubjects = async () => {
            try {
                const response = await apiContext.subject.getSubjects();
                setData(response);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, []);


    return (
        <Box p={4} borderWidth="1px" borderRadius="lg">
            <HStack gap={4}>
            <Input
                type="search"
                placeholder="Поиск по названию дисциплины..."
                width="40%"
            />
                <Button onClick={handleAddSubject}>Добавить...</Button>
            </HStack>

            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>ID</Table.Cell>
                        <Table.Cell>Наименование</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {currentData.length > 0 ? (
                        currentData.map((subject) => (
                            <Table.Row key={subject.id}>
                                <Table.Cell>{subject.id}</Table.Cell>
                                <Table.Cell>{subject.name}</Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan={2} textAlign="center">
                                Список дисциплин пуст
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>

            {totalItems > 0 && (
                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                    <Pagination.Root
                        count={totalItems}
                        pageSize={itemsPerPage}
                        page={currentPage}
                        onPageChange={({page}) => setCurrentPage(page)}
                    >
                        <Pagination.PrevTrigger asChild>
                            <IconButton aria-label="Previous page">
                                <LuChevronLeft />
                            </IconButton>
                        </Pagination.PrevTrigger>

                        <Pagination.NextTrigger asChild>
                            <IconButton aria-label="Next page">
                                <LuChevronRight />
                            </IconButton>
                        </Pagination.NextTrigger>
                    </Pagination.Root>
                </Flex>
            )}
        </Box>
    );

}

export default SubjectsView;