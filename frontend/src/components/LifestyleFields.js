import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip
} from '@mui/material';

const intensityOptions = ['매우 많음', '많음', '보통', '적음', '매우 적음'];

const habitOptions = {
  기호식: ['술', '담배', '커피', '탄산음료', '매운음식', '짠음식', '단음식'],
};

const LifestyleFields = ({ values, onChange }) => {
  const handleChange = (name, value) => {
    onChange({ ...values, [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>생활습관</Typography>
      </Grid>

      {/* 육체노동 */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>육체노동</InputLabel>
          <Select
            name="육체노동"
            value={values.육체노동 || ''}
            onChange={(e) => handleChange('육체노동', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              }
            }}
          >
            {intensityOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* 스트레스 */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>스트레스</InputLabel>
          <Select
            name="스트레스"
            value={values.스트레스 || ''}
            onChange={(e) => handleChange('스트레스', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              }
            }}
          >
            {intensityOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* 운동 */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>운동</InputLabel>
          <Select
            name="운동"
            value={values.운동 || ''}
            onChange={(e) => handleChange('운동', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              }
            }}
          >
            {intensityOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* 기호식 */}
      <Grid item xs={12}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>기호식</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {habitOptions.기호식.map((option) => (
              <Chip
                key={option}
                label={option}
                onClick={() => {
                  const current = values.기호식 || [];
                  const newValue = current.includes(option)
                    ? current.filter(item => item !== option)
                    : [...current, option];
                  handleChange('기호식', newValue);
                }}
                color={values.기호식?.includes(option) ? "primary" : "default"}
                sx={{
                  borderRadius: '16px',
                  '&.MuiChip-colorPrimary': {
                    backgroundColor: '#4a77d4',
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LifestyleFields;
