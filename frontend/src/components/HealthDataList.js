import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Box,
  Typography,
  TextField,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const HealthDataList = () => {
  const navigate = useNavigate();
  const [환자목록, set환자목록] = useState([]);
  const [검색어, set검색어] = useState('');

  // 환자 목록 조회
  useEffect(() => {
    환자목록조회();
  }, []);

  const 환자목록조회 = async () => {
    try {
      const response = await fetch('/api/patients');
      const data = await response.json();
      set환자목록(data);
    } catch (error) {
      console.error('환자 목록 조회 실패:', error);
      alert('환자 목록을 불러오는데 실패했습니다.');
    }
  };

  // 환자 삭제
  const 환자삭제 = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/patients/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('삭제되었습니다.');
          환자목록조회(); // 목록 새로고침
        }
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  // 검색 기능
  const 검색된환자목록 = 환자목록.filter(환자 => 
    환자.이름.includes(검색어) || 
    환자.주민등록번호.includes(검색어)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          환자 목록
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/')}
        >
          새 환자 등록
        </Button>
      </Box>

      {/* 검색 영역 */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="환자 이름 또는 주민등록번호로 검색"
          value={검색어}
          onChange={(e) => set검색어(e.target.value)}
          size="small"
        />
        <IconButton color="primary">
          <SearchIcon />
        </IconButton>
      </Box>

      {/* 환자 목록 테이블 */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>주민등록번호</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>최근 진료일</TableCell>
              <TableCell>형기체질</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {검색된환자목록.map((환자) => (
              <TableRow key={환자.id}>
                <TableCell>{환자.이름}</TableCell>
                <TableCell>{환자.주민등록번호}</TableCell>
                <TableCell>{환자.연락처}</TableCell>
                <TableCell>{환자.맥파측정일시?.split('T')[0] || '-'}</TableCell>
                <TableCell>{환자.형기체질 || '-'}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary"
                    onClick={() => navigate(`/edit/${환자.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => 환자삭제(환자.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HealthDataList;
