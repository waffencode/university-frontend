import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Text, Card, CardHeader, CardBody, Heading, HStack, Spinner} from '@chakra-ui/react';
import {ConfigContext} from './ConfigProvider';
import { WarningIcon} from "@chakra-ui/icons";

type VersionInfoProps = {};

/**
 * Displays information about the API version and frontend version.
 * The fetched versions are then displayed within a Card component with appropriate headings.
 *
 * Used in: admin dashboard.
 *
 * @example
 * <VersionInfo />
 * @author
 * waffencode@gmail.com
 */
const VersionInfo: React.FC<VersionInfoProps> = () => {
    require('tailwindcss/defaultTheme');

    // State variables for storing version information
    const [version, setVersion] = useState<string>('');
    const [frontendVersion, setFrontendVersion] = useState<string>('');
    const [errorText, setErrorText] = useState<string>('');
    const [isVersionFetchError, setIsVersionFetchError] = useState<boolean>(false);
    const [isStillLoading, setIsStillLoading] = useState<boolean>(true);

    // Accessing serverUrl and frontendDisplayVersion from the ConfigContext
    const {serverUrl, frontendDisplayVersion} = useContext(ConfigContext);

    useEffect(() => {
        const fetchVersion = async () => {
            setFrontendVersion(frontendDisplayVersion);

            try {
                const response = await axios.get(serverUrl + '/api/Version');
                setVersion(response.data);
            } catch (error: any) {
                if (error instanceof Error) {
                    setErrorText(`Network Error. Check your server connection and try again. Technical information: ${error.stack}` as string);
                }
                setVersion("Unable to fetch version");
                setIsVersionFetchError(true);
                console.log(error);
            }

            setIsStillLoading(false);
        };

        fetchVersion();

    }, [frontendDisplayVersion, serverUrl, errorText, isVersionFetchError]);

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
                {isStillLoading &&
                    <Spinner />
                }
                <Text pt='2' fontSize='sm'>
                    {version}
                </Text>
                {isVersionFetchError &&
                    <HStack spacing='1em'>
                        <WarningIcon boxSize='1.4em' color='red.500'/>
                        <Text pt='2' fontSize='sm'>
                            {errorText}
                        </Text>
                    </HStack>
                }
            </CardBody>
            <CardHeader>
                <Heading size='s'>Frontend Version</Heading>
            </CardHeader>
            <CardBody>
                <Text pt='2' fontSize='sm'>
                    {frontendVersion}
                </Text>
            </CardBody>
        </Card>
    );
};

export default VersionInfo;
