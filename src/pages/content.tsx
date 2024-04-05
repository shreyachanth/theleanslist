import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function Content() {
	const [weight, setWeight] = useState("");
	const [height, setHeight] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("female");
	
	const [weightError, setWeightError] = useState<[boolean, string]>([false, ""]);
	const [heightError, setHeightError] = useState<[boolean, string]>([false, ""]);
	const [ageError, setAgeError] = useState<[boolean, string]>([false, ""]);
	
	const inputCheck = (
		entry: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		setVal: Dispatch<SetStateAction<any>>,
		setErr: Dispatch<SetStateAction<[boolean, string]>>,
		isAge: boolean = false
	) => {
		const val = Number(entry.target.value);
		if (val < 1 || (isAge && val % 1 != 0)) {
			setErr([true, "enter a valid amount"]);
		} else {
			setVal(val);
			setErr([false, ""]);
		}
	};
	
	return (
		<Box component="form" sx={{
			position: "absolute",
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			"& > :not(style)": { m: 1, width: "25ch" },
		}}>
			<TextField
				required id="weight-input" label="Weight" type="number"
				value={weight} onChange={e => inputCheck(e, setWeight, setWeightError)}
				error={weightError[0]} helperText={weightError[1]}
				InputProps={{endAdornment: <InputAdornment position="end">lbs</InputAdornment>}}
			/>
			<TextField
				required id="height-input" label="Height" type="number"
				value={height} onChange={e => inputCheck(e, setHeight, setHeightError)}
				error={heightError[0]} helperText={heightError[1]}
				InputProps={{endAdornment: <InputAdornment position="end">inches</InputAdornment>}}
			/>
			<TextField
				required id="age-input" label="Age" type="number"
				value={age} onChange={e => inputCheck(e, setAge, setAgeError, true)}
				error={ageError[0]} helperText={ageError[1]}
				InputProps={{endAdornment: <InputAdornment position="end">years</InputAdornment>}}
			/>
			<TextField select
				required id="gender-input" label="Gender"
				value={gender} onChange={e => setGender(e.target.value)}
				helperText="select your gender"
			>
				<MenuItem value="male">Male</MenuItem>
				<MenuItem value="female">Female</MenuItem>
				<MenuItem value="other">Other</MenuItem>
			</TextField>
			
			<Button variant="contained">Calculate</Button>
		</Box>
	);
}