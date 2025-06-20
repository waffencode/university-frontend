import { Card, CardBody, CardHeader, Heading, HStack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigProvider";

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
const VersionInfo: React.FC = () => {
	// State variables for storing version information
	const [version, setVersion] = useState<string>("");
	const [frontendVersion, setFrontendVersion] = useState<string>("");
	const [errorText, setErrorText] = useState<string>("");
	const [isVersionFetchError, setIsVersionFetchError] = useState<boolean>(false);
	const [isStillLoading, setIsStillLoading] = useState<boolean>(true);

	// Accessing serverUrl and frontendDisplayVersion from the ConfigContext
	const { serverUrl } = useContext(ConfigContext);

	useEffect(() => {
		const fetchVersion = async () => {
			setFrontendVersion(import.meta.env.APP_VERSION);

			try {
				const response = await axios.get(serverUrl + "/Version");
				setVersion(response.data);
			} catch (error: any) {
				if (error instanceof Error) {
					setErrorText(
						`Сетевая ошибка. Проверьте соединение с сервером и повторите попытку. Техническая информация: ${error.stack}` as string,
					);
				}
				setVersion("Ошибка при получении версии");
				setIsVersionFetchError(true);
				console.log(error);
			}

			setIsStillLoading(false);
		};

		fetchVersion();
	}, [serverUrl, errorText, isVersionFetchError]);

	return (
		<Card.Root p={1} rounded="md" boxShadow="md" w="90%" mx="auto" size="sm">
			<Card.Header>
				<Heading size="sm">Версия API</Heading>
			</Card.Header>
			<Card.Body>
				{isStillLoading && "Загрузка..."}
				<Text pt="2" fontSize="sm">
					{version}
				</Text>
				{isVersionFetchError && (
					<HStack gap="1em">
						<Text pt="2" fontSize="sm">
							{errorText}
						</Text>
					</HStack>
				)}
			</Card.Body>
			<CardHeader>
				<Heading size="sm">Версия Frontend</Heading>
			</CardHeader>
			<CardBody>
				<Text pt="2" fontSize="sm">
					{frontendVersion}
				</Text>
			</CardBody>
		</Card.Root>
	);
};

export default VersionInfo;
