import axios from 'axios';
import React, { useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter, Heading} from '@chakra-ui/react'

type VersionInfoProps = {};

const VersionInfo: React.FC<VersionInfoProps> = () => {
    const tailwind = require('tailwindcss/defaultTheme');

    const [version, setVersion] = useState<string>('');
    const fetchVersion = async () => {
        axios.get('https://localhost:7065/api/Version')
            .then(response => {
                setVersion(response.data);
            }, error => {
                console.log(error);
            });
    };

    fetchVersion();

    return (
        <Card
            p={1}
            rounded="md"
            boxShadow="md"
            w="90%"
            mx="auto"
            size="sm"
        >
            <CardHeader>
                <Heading size='s'>API Version</Heading>
            </CardHeader>
            <CardBody>
                {version}
            </CardBody>
            <CardHeader>
                <Heading size='s'>Frontend version</Heading>
            </CardHeader>
            <CardBody>
                TBA
            </CardBody>
        </Card>
    );
};

export default VersionInfo;
