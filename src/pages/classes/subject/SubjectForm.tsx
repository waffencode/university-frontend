import React from "react";
import {Button} from "../../../components/ui/button.tsx";
import {Input, VStack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

interface SubjectFormData {
    name: string;
}

const SubjectForm: React.FC = () => {
    const {} = useForm();
    const navigate = useNavigate();

    return (
        <>
            <form>
                <VStack gap={8} align="left" width="40%">
                <Input placeholder="Название дисциплины" type="text" maxLength={50} />
                <Button>Добавить</Button>
                    <Button onClick={() => {navigate(-1)}}>Назад</Button>
                </VStack>
            </form>
        </>
    );
}

export default SubjectForm;