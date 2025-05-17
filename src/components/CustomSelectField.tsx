import { createListCollection, Portal, Select } from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

interface ICustomMultipleSelectFieldProps {
	control: any;
	name: string;
	options: { value: string; label: string }[];
	multiple?: boolean;
	size?: any;
	defaultValue?: any;
}

const CustomSelectField: React.FC<ICustomMultipleSelectFieldProps> = (
	props: ICustomMultipleSelectFieldProps,
) => {
	const { control, name, multiple, size, defaultValue } = props;
	const collection = createListCollection({ items: props.options });

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Select.Root
					name={field.name}
					value={
						multiple ? field.value || [] : [field.value?.toString()]
					}
					onValueChange={({ value }) =>
						field.onChange(multiple ? value : (value?.[0] ?? null))
					}
					onInteractOutside={() => field.onBlur()}
					defaultValue={defaultValue}
					collection={collection}
					multiple={multiple}
					size={size}
				>
					<Select.HiddenSelect />
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Выберите значение..." />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{collection.items.map((collectionItem) => (
									<Select.Item
										item={collectionItem}
										key={collectionItem.value}
									>
										{collectionItem.label}
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>
			)}
		/>
	);
};

export default CustomSelectField;
