import {useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi.js";
import InputAutocomplete from "./core/InputAutocomplete.jsx";
import PropTypes from "prop-types";
import {Select, SelectItem} from "@nextui-org/react";
import {useController} from "react-hook-form";

const typeJoin = [
	{key: "joinGame", label: "Join game"},
	{key: "viewGame", label: "View game"},
];

const InputSelectTypeJoinGame = (props) => {
	const {
		field,
		fieldState: { invalid, isTouched, isDirty , error},
		formState: { touchedFields, dirtyFields }
	} = useController({
		name: props.name,
		control: props.control,
		rules: props.rules,
	});

	console.log(field.value)

	const handleChangeValue = (value) => {
		field.onChange(value)
	}

	return <Select
		// react form hook
		onChange={handleChangeValue}
		onBlur={field.onBlur}
		ref={field.ref}

		// nextUI
		isInvalid={!!error}
		errorMessage={error?.message}

		size={'sm'}
		variant={'flat'}

		selectedKeys={[field.value]}
	>
		{typeJoin.map((type) => (
			<SelectItem key={type.key}>{type.label}</SelectItem>
		))}
	</Select>

}

export default InputSelectTypeJoinGame;