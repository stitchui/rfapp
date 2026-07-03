import { useMemo } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AppHeader } from '../../components/AppHeader';
import { RfmGrid } from './RfmGrid';
import { buildLeafRows } from './mockData';

export default function RiskFactorMappings() {
  const rowData = useMemo(() => buildLeafRows(), []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f4' }}>
      <AppHeader />

      <Box sx={{ maxWidth: 1480, mx: 'auto', px: '28px', pt: '26px', pb: '90px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: '18px' }}>
          <Typography variant="h1" sx={{
            fontSize: 26, fontWeight: 600, color: '#4c6a92', letterSpacing: '-0.01em', m: 0,
          }}>
            Risk Factor Mappings
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 19 }} />}
            sx={{
              height: 40, px: 2, borderRadius: 999, fontSize: 14, fontWeight: 600,
              bgcolor: '#004d2c', textTransform: 'none',
              '&:hover': { bgcolor: '#0a5c38' },
            }}
          >
            Create
          </Button>
        </Box>

        <Paper elevation={0} sx={{
          border: '1px solid #e0e0e0', borderRadius: '18px',
          boxShadow: '0 2px 8px rgba(0,0,0,.08)', overflow: 'hidden',
        }}>
          <RfmGrid rowData={rowData} />
        </Paper>
      </Box>
    </Box>
  );
}
