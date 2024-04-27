import axios from 'axios';
import React, {useContext, useState} from 'react';
import {Card, CardHeader, CardBody, Heading} from '@chakra-ui/react'
import { ConfigContext } from './ConfigProvider';

type VersionInfoProps = {};

const VersionInfo: React.FC<VersionInfoProps> = () => {
    require('tailwindcss/defaultTheme');

    const [version, setVersion] = useState<string>('');
    const [ frontendversion, setFrontendVersion] = useState<string>('');
    const { serverUrl } = useContext(ConfigContext);
    const { frontendDisplayVersion } = useContext(ConfigContext);
    const fetchVersion = async () => {
        axios.get(serverUrl + '/api/Version')
            .then(response => {
                setVersion(response.data);
                setFrontendVersion(frontendDisplayVersion);
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
                {frontendversion}
            </CardBody>
        </Card>
    );
};

export default VersionInfo;
