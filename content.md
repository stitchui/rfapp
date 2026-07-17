Select a Class, Currency, and Curve to search
Matching risk factors will appear here as a table once your filters return results.

```jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

function EmptySearchState() {
  return (
    <Box
      sx={{
        flex: 'none',
        px: 4,
        pt: 7,
        pb: 7.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        textAlign: 'center',
        bgcolor: 'var(--surface-subtle, #f8fafc)',
      }}
    >
      <FilterAltOutlinedIcon sx={{ fontSize: 34, color: 'var(--slate-400, #8b97a4)' }} />
      <Typography
        sx={{
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--slate-700, #3d516b)',
        }}
      >
        Select a Class, Currency, and Curve to search
      </Typography>
      <Typography
        sx={{
          fontSize: '0.85rem',
          color: 'var(--text-body, #687687)',
          maxWidth: 340,
        }}
      >
        Matching risk factors will appear here as a table once your filters return results.
      </Typography>
    </Box>
  );
}

export default EmptySearchState;
```

---

```jsx
// Legend, shown above the grid
function EditableLegend() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '2px',
          bgcolor: '#eff4fb',
        }}
      />
      <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>
        Blue = editable field
      </Typography>
    </Box>
  );
}


---

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.secondary' }}>
          {rows.length} records found
        </Typography>
        <EditableLegend />
      </Box>
```
