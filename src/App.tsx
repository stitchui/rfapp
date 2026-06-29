import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import RiskFactorMappings from './features/RiskFactorMappings';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RiskFactorMappings />
    </ThemeProvider>
  );
}
