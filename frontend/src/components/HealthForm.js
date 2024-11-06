import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Box,
  Button,
  Typography,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';

const HealthForm = ({ 환자정보, 저장하기 }) => {
  const [formData, setFormData] = useState({
    // 기본 정보
    이름: '',
    연락처: '',
    주민등록번호: '',
    키: '',
    체중: '',
    혈당: '',
    체온: '',
    BMI: '',
    
    // 성격 및 체질
    성격: '',
    형기체질: '',
    
    // 건강 상태
    아픈부위: [],
    복용약물: [],
    복용기간: '',
    
    // 생활 습관
    육체노동: '',
    스트레스: '',
    기호식: [],
    운동: '',
    
    // 추가 정보
    맥파: '',
    메모: ''
  });

  // BMI 자동 계산
  useEffect(() => {
    if (formData.키 && formData.체중) {
      const 키_미터 = formData.키 / 100;
      const bmi = (formData.체중 / (키_미터 * 키_미터)).toFixed(1);
      setFormData(prev => ({ ...prev, BMI: bmi }));
    }
  }, [formData.키, formData.체중]);

  // 나이에 따른 형기체질 옵션
  const get형기체질옵션 = (주민번호) => {
    // 나이 계산 로직 구현
    // 세대별 형기체질 옵션 반환
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const 성격옵션 = ['매우 급함', '급함', '보통', '느긋', '매우 느긋'];
  const 복용기간옵션 = ['3개월 이내', '6개월 이내', '1년 이내', '1년 이상'];
  const 정도옵션 = ['매우 많음', '많음', '보통', '적음', '매우 적음'];

  const onSubmit = (e) => {
    e.preventDefault();
    if (typeof 저장하기 === 'function') {
      저장하기(formData);
    }
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#bdbdbd',
      },
    },
    '& .MuiInputLabel-root': {
      display: 'none'  // 라벨 숨기기
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="이름"
            name="이름"
            value={formData.이름}
            onChange={handleChange}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="주민등록번호"
            name="주민등록번호"
            value={formData.주민등록번호}
            onChange={handleChange}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="연락처"
            name="연락처"
            value={formData.연락처}
            onChange={handleChange}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="키"
            name="키"
            value={formData.키}
            onChange={handleChange}
            variant="outlined"
            type="number"
            InputProps={{
              endAdornment: 'cm'
            }}
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="몸무게"
            name="몸무게"
            value={formData.몸무게}
            onChange={handleChange}
            variant="outlined"
            type="number"
            InputProps={{
              endAdornment: 'kg'
            }}
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="혈액형"
            name="혈액형"
            value={formData.혈액형}
            onChange={handleChange}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="특이사항"
            name="특이사항"
            value={formData.특이사항}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={3}
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="small"
            >
              저장
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HealthForm;