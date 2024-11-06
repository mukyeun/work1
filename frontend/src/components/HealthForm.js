import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Chip,
  InputAdornment
} from '@mui/material';

const HealthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    이름: '',
    주민등록번호: '',
    연락처: '',
    키: '',
    몸무게: '',
    혈액형: '',
    특이사항: '',
    육체노동: '',
    스트레스: '',
    운동: '',
    기호식: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const 기호식_옵션 = ['술', '담배', '커피', '탄산음료', '매운음식', '짠음식', '단음식'];

  const handleHabitToggle = (habit) => {
    setFormData(prev => ({
      ...prev,
      기호식: prev.기호식.includes(habit)
        ? prev.기호식.filter(item => item !== habit)
        : [...prev.기호식, habit]
    }));
  };

  return (
    <Paper elevation={1} sx={{ p: 3, maxWidth: 800, margin: 'auto', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'normal' }}>기본 정보</Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="이름"
            name="이름"
            value={formData.이름}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            placeholder="주민등록번호"
            name="주민등록번호"
            value={formData.주민등록번호}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            placeholder="연락처"
            name="연락처"
            value={formData.연락처}
            onChange={handleChange}
            variant="outlined"
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="키"
              name="키"
              value={formData.키}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              variant="outlined"
            />

            <TextField
              fullWidth
              placeholder="몸무게"
              name="몸무게"
              value={formData.몸무게}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              variant="outlined"
            />
          </Box>

          <TextField
            fullWidth
            placeholder="혈액형"
            name="혈액형"
            value={formData.혈액형}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            placeholder="특이사항"
            name="특이사항"
            multiline
            rows={4}
            value={formData.특이사항}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Typography variant="h6" sx={{ mb: 3, mt: 4, fontWeight: 'normal' }}>생활습관</Typography>
        
        <Box sx={{ display: 'grid', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <FormControl fullWidth>
              <Select
                value={formData.육체노동}
                onChange={handleChange}
                name="육체노동"
                displayEmpty
                renderValue={value => value || "육체노동"}
              >
                {['매우 많음', '많음', '보통', '적음', '매우 적음'].map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Select
                value={formData.스트레스}
                onChange={handleChange}
                name="스트레스"
                displayEmpty
                renderValue={value => value || "스트레스"}
              >
                {['매우 많음', '많음', '보통', '적음', '매우 적음'].map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Select
                value={formData.운동}
                onChange={handleChange}
                name="운동"
                displayEmpty
                renderValue={value => value || "운동"}
              >
                {['매우 많음', '많음', '보통', '적음', '매우 적음'].map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography variant="subtitle2" sx={{ mt: 1 }}>기호식</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {기호식_옵션.map((habit) => (
              <Chip
                key={habit}
                label={habit}
                onClick={() => handleHabitToggle(habit)}
                color={formData.기호식.includes(habit) ? "primary" : "default"}
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#4a77d4',
              '&:hover': {
                bgcolor: '#3a67c4',
              }
            }}
          >
            저장
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default HealthForm;