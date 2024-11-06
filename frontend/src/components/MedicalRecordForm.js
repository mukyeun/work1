import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

const MedicalRecordForm = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    진료일자: new Date().toISOString().split('T')[0],
    진료과목: '',
    담당의사: '',
    주증상: '',
    진단내용: '',
    처방내용: '',
    특이사항: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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

  const textFieldStyle = {
    width: '100%',
    mb: 1.5,
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#bdbdbd',
      },
    },
    '& .MuiInputBase-input': {
      padding: '6px 10px',
      fontSize: '0.875rem',
      lineHeight: '1.5'
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '0'
    },
    '& .MuiInputBase-multiline': {
      padding: '6px 10px',
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '4px',
          p: 2.5,
          width: '460px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 0,
        mb: 2,
        fontSize: '1rem',
        fontWeight: 'normal'
      }}>
        새 진료 기록
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
            <TextField
              type="date"
              name="진료일자"
              value={formData.진료일자}
              onChange={handleChange}
              sx={{ ...textFieldStyle, mb: 0, flex: 1 }}
            />
            <TextField
              placeholder="진료과목"
              name="진료과목"
              value={formData.진료과목}
              onChange={handleChange}
              sx={{ ...textFieldStyle, mb: 0, flex: 1 }}
            />
          </Box>

          <TextField
            placeholder="담당의사"
            name="담당의사"
            value={formData.담당의사}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            placeholder="주증상"
            name="주증상"
            value={formData.주증상}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            placeholder="진단내용"
            name="진단내용"
            value={formData.진단내용}
            onChange={handleChange}
            multiline
            rows={2}
            sx={textFieldStyle}
          />

          <TextField
            placeholder="처방내용"
            name="처방내용"
            value={formData.처방내용}
            onChange={handleChange}
            multiline
            rows={2}
            sx={textFieldStyle}
          />

          <TextField
            placeholder="특이사항"
            name="특이사항"
            value={formData.특이사항}
            onChange={handleChange}
            multiline
            rows={2}
            sx={{ ...textFieldStyle, mb: 0 }}
          />
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 0,
          mt: 2,
          justifyContent: 'flex-end'
        }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: '#4a77d4',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
          >
            취소
          </Button>
          <Button 
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#4a77d4',
              '&:hover': {
                backgroundColor: '#3d63b0'
              },
              textTransform: 'none',
              minWidth: '60px',
              height: '32px'
            }}
          >
            저장
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MedicalRecordForm; 
