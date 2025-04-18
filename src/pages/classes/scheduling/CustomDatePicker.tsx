import { Input } from "@chakra-ui/react";
import { ru } from "date-fns/locale";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

interface RHDatePickerProps {
	name: string;
	control: any;
	label?: string;
	placeholder?: string;
	size?: any;
}

const CustomDatePicker: React.FC<RHDatePickerProps> = ({
	name,
	control,
	label,
	placeholder = "Выберите дату",
	size,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<DatePicker
					id={name}
					locale="ru"
					dateFormat="dd.MM.yyyy"
					placeholderText={placeholder}
					selected={field.value}
					onChange={(date) =>
						field.onChange(date?.toLocaleDateString())
					}
					customInput={
						<Input
							size={size}
							autoComplete="off"
							{...(error && { borderColor: "red.500" })}
						/>
					}
				/>
			)}
		/>
	);
};

export default CustomDatePicker;
