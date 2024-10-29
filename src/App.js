import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'

import { Game } from './components'

const App = () => {
  return (
	<BrowserRouter>
		<Box sx={{ backgroundColor: '#FFF' }}>
			<Routes>
				<Route path="/" element={<Game />} />
			</Routes>
		</Box>
	</BrowserRouter>
  )
}

export default App