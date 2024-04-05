import Head from "next/head";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Content from "./content";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export default function Home() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Head>
				<title>TheLeansList</title>
				<meta name="description" content="fitness fitness fitness fitness fitness" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			
			<Content></Content>
		</ThemeProvider>
	);
}
