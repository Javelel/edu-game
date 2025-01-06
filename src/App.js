import React from 'react'
import { HashRouter , Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'

import { Game } from './components'

const App = () => {
  return (
	<HashRouter >
		<Box sx={{ backgroundColor: '#FFF' }}>
			<Routes>
				<Route path="/" element={<Game />} />
			</Routes>
		</Box>
	</HashRouter >
  )
}

export default App