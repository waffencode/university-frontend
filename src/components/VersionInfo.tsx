import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';
import { ConfigContext } from './ConfigProvider';

type VersionInfoProps = {};

/**
 * Displays information about the API version and frontend version.
 * The fetched versions are then displayed within a Card component with appropriate headings.
 *
 * Used in: admin dashboard.
 *
 * @example
 * <VersionInfo />
 */
const VersionInfo: React.FC<VersionInfoProps> = () => {
    require('tailwindcss/defaultTheme');

    // State variables for storing version information
    const [version, setVersion] = useState<string>('');
    const [frontendVersion, setFrontendVersion] = useState<string>('');

    // Accessing serverUrl and frontendDisplayVersion from the ConfigContext
    const { serverUrl, frontendDisplayVersion } = useContext(ConfigContext);

    useEffect(() => {
        const fetchVersion = async () => {
            setFrontendVersion(frontendDisplayVersion);

            try {
                const response = await axios.get(serverUrl + '/api/Version');
                setVersion(response.data);
            } catch (error) {
                setVersion("Unable to fetch version");
                console.log(error);
            }
        };

        fetchVersion();

    }, []);

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
                {frontendVersion}
            </CardBody>
        </Card>
    );
};

export default VersionInfo;
