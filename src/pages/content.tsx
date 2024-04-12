import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import page from "@/styles/Page.module.css";

function round(val: number, places: number) {
	return Math.round((val + Number.EPSILON) * Math.pow(10, places)) / Math.pow(10, places);
}

export default function Content() {
	const [weight, setWeight] = useState();
	const [height, setHeight] = useState();
	const [age, setAge] = useState();
	const [gender, setGender] = useState("female");
	
	const [weightError, setWeightError] = useState<[boolean, string]>([false, ""]);
	const [heightError, setHeightError] = useState<[boolean, string]>([false, ""]);
	const [ageError, setAgeError] = useState<[boolean, string]>([false, ""]);
	
	const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
	
	const [resultsAvailable, setResultsAvailable] = useState(false);
	const [openCalorieList, setOpenCalorieList] = useState(true);
	const [bmi, setBMI] = useState(0);
	const [protein, setProtein] = useState(0);
	const [bmr, setBMR] = useState(0);
	
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
		
		setSubmitBtnDisabled(!weight || weightError[0] || !height || heightError[0] || !age || ageError[0]);
	};
	
	const calculate = () => {
		if (!weight || !height || !age || !gender) {
			return;
		}
		
		setBMI(round(weight / (height * height) * 703, 2));
		setProtein(round((weight / 20) * 7, 2));
		
		const temp = (10 * weight * 0.45) + (6.25 * height * 2.54) - (5 * age);
		setBMR(round(temp + (gender == 'female' ? -161 : 5), 2));
		
		setResultsAvailable(true);
	};
	
	return (
		<Box className={page.container}>
			<Box component="form" className={page.form}>
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
				>
					<MenuItem value="male">Male</MenuItem>
					<MenuItem value="female">Female</MenuItem>
					<MenuItem value="other">Other</MenuItem>
				</TextField>
				
				<Button variant="contained" disabled={submitBtnDisabled} onClick={calculate}>Calculate</Button>
			</Box>
			
			{ resultsAvailable && (
					<>
						<br />
						<List className={page.info} sx={{ bgcolor: 'background.paper' }}>
							<ListItem>
								<ListItemText primary={"BMI: " + bmi} />
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText primary={"Protein Intake: " + protein} />
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText primary={"Basal Metabolic Rate: " + bmr} />
							</ListItem>
							<Divider />
							<ListItemButton onClick={() => setOpenCalorieList(!openCalorieList)}>
								<ListItemText primary="Calories" />
								{ openCalorieList ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
							</ListItemButton>
							<Collapse in={openCalorieList} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<ListItem sx={{ pl: 4 }}>
										<ListItemText primary={"Sedentary: " + round(bmr * 1.2, 2)} />
									</ListItem>
									<ListItem sx={{ pl: 4 }}>
										<ListItemText primary={"Light Exercise: " + round(bmr * 1.375, 2)} />
									</ListItem>
									<ListItem sx={{ pl: 4 }}>
										<ListItemText primary={"Moderate Exercise: " + round(bmr * 1.55, 2)} />
									</ListItem>
									<ListItem sx={{ pl: 4 }}>
										<ListItemText primary={"Heavy Exercise: " + round(bmr * 1.725, 2)} />
									</ListItem>
									<ListItem sx={{ pl: 4 }}>
										<ListItemText primary={"Athlete: " + round(bmr * 1.9, 2)} />
									</ListItem>
								</List>
							</Collapse>
						</List>
					</>
				)
			}
		</Box>
	);
}