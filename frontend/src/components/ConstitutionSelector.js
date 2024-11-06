import React, { useMemo } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';

const constitutionsByAge = {
  유소년기: {
    ageRange: [0, 18],
    options: [
      "형기구실",
      "형기미실",
      "형기과실"
    ]
  },
  청년기: {
    ageRange: [19, 39],
    options: [
      "형기구실",
      "형기미실",
      "형기과실",
      "형쇠기실"
    ]
  }
};

const ConstitutionSelector = ({ birthDate, selectedConstitution, onChange }) => {
  const age = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }, [birthDate]);

  const { period, options } = useMemo(() => {
    if (!age) return { period: null, options: [] };
    
    const period = Object.entries(constitutionsByAge).find(([_, data]) => {
      const [min, max] = data.ageRange;
      return age >= min && age <= max;
    });

    return period ? {
      period: period[0],
      options: period[1].options
    } : { period: null, options: [] };
  }, [age]);

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>형기체질</Typography>
      {period && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          현재 연령대: {period} ({age}세)
        </Typography>
      )}
      <FormControl fullWidth>
        <InputLabel>형기체질 선택</InputLabel>
        <Select
          value={selectedConstitution || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={!age}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ConstitutionSelector; 