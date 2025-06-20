import User from "@/entities/domain/User";
import { Button, CheckboxCard, CheckboxGroup, Dialog, VStack, Wrap } from "@chakra-ui/react";
import React from "react";

interface IReceiversDialogContentProps {
	proposedReceivers: User[];
	selectedReceivers: string[];
	setSelectedReceivers: (receivers: string[]) => void;
}

const ReceiversSelectDialog: React.FC<IReceiversDialogContentProps> = ({
	proposedReceivers,
	selectedReceivers,
	setSelectedReceivers,
}: IReceiversDialogContentProps) => {
	return (
		<Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom" scrollBehavior="inside">
			<Dialog.Trigger asChild>
				<Button variant="outline">Выбрать</Button>
			</Dialog.Trigger>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Выбрать получателей</Dialog.Title>
					</Dialog.Header>
					<Dialog.Body>
						<VStack gap={2} align="left">
							<Wrap gap={5}>
								<CheckboxGroup defaultValue={selectedReceivers} onValueChange={setSelectedReceivers}>
									{proposedReceivers &&
										proposedReceivers.map((receiverUser) => (
											<CheckboxCard.Root
												size="sm"
												key={receiverUser.id}
												value={receiverUser.id}
												maxW="240px"
											>
												<CheckboxCard.HiddenInput />
												<CheckboxCard.Control>
													<CheckboxCard.Content>
														<CheckboxCard.Label>{receiverUser.fullName}</CheckboxCard.Label>
														<CheckboxCard.Description>
															{receiverUser.email}
														</CheckboxCard.Description>
													</CheckboxCard.Content>
													<CheckboxCard.Indicator />
												</CheckboxCard.Control>
											</CheckboxCard.Root>
										))}
								</CheckboxGroup>
							</Wrap>
						</VStack>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.ActionTrigger asChild>
							<Button variant="outline" onClick={() => setSelectedReceivers([])}>
								Сброс
							</Button>
						</Dialog.ActionTrigger>

						<Dialog.ActionTrigger asChild>
							<Button>Сохранить</Button>
						</Dialog.ActionTrigger>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};

export default ReceiversSelectDialog;
