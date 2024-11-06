import React from 'react';
import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Typography
} from '@mui/material';

const medications = {
  "소염진통제": [
    "아스피린",
    "이부프로펜",
    "나프록센",
    "디클로페낙"
  ],
  "항생제": [
    "아목시실린",
    "세파클러",
    "독시사이클린",
    "아지스로마이신"
  ],
  "고혈압약": [
    "암로디핀",
    "로사르탄",
    "텔미사르탄",
    "라미프릴"
  ]
};

const flattenedMedications = Object.entries(medications).reduce((acc, [category, drugs]) => {
  return acc.concat(drugs.map(drug => ({
    category,
    drug
  })));
}, []);

const MedicationSelector = ({ selectedMedications = [], onChange }) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>복용약물</Typography>
      <Autocomplete
        multiple
        options={flattenedMedications}
        getOptionLabel={(option) => option.drug}
        groupBy={(option) => option.category}
        value={selectedMedications}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="약물을 선택하세요"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.drug}
              {...getTagProps({ index })}
            />
          ))
        }
      />
    </Box>
  );
};

export default MedicationSelector; 