import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MedicalRecordForm from './MedicalRecordForm';

const MedicalRecords = () => {
  const [진료기록, set진료기록] = useState([
    {
      진료일자: '2024-03-14',
      진료과목: '내과',
      담당의사: '김의사',
      주증상: '두통',
      진단내용: '긴장성 두통',
      처방내용: '진통제 처방',
      특이사항: '주 3회 이상 발생'
    }
  ]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const handleAdd = () => {
    setEditingRecord(null);
    setFormOpen(true);
  };

  const handleEdit = (index) => {
    setEditingRecord({ ...진료기록[index], index });
    setFormOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('이 진료 기록을 삭제하시겠습니까?')) {
      const newRecords = 진료기록.filter((_, i) => i !== index);
      set진료기록(newRecords);
    }
  };

  const handleFormSubmit = (data) => {
    if (editingRecord) {
      // 수정
      const newRecords = [...진료기록];
      newRecords[editingRecord.index] = data;
      set진료기록(newRecords);
    } else {
      // 새로 추가
      set진료기록([...진료기록, data]);
    }
    setFormOpen(false);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'normal' }}>
          진료 기록
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleAdd}
          sx={{
            backgroundColor: '#4a77d4',
            '&:hover': {
              backgroundColor: '#3d63b0'
            },
            textTransform: 'none',
            fontSize: '0.9rem'
          }}
        >
          새 진료 기록
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'normal', color: '#666' }}>진료일자</TableCell>
              <TableCell sx={{ fontWeight: 'normal', color: '#666' }}>진료과목</TableCell>
              <TableCell sx={{ fontWeight: 'normal', color: '#666' }}>담당의사</TableCell>
              <TableCell sx={{ fontWeight: 'normal', color: '#666' }}>주증상</TableCell>
              <TableCell sx={{ fontWeight: 'normal', color: '#666' }}>진단내용</TableCell>
              <TableCell sx={{ fontWeight: 'normal', color: '#666' }}>처방내용</TableCell>
              <TableCell sx={{ fontWeight: 'normal', color: '#666' }}>특이사항</TableCell>
              <TableCell align="center">관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {진료기록.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.진료일자}</TableCell>
                <TableCell>{record.진료과목}</TableCell>
                <TableCell>{record.담당의사}</TableCell>
                <TableCell>{record.주증상}</TableCell>
                <TableCell>{record.진단내용}</TableCell>
                <TableCell>{record.처방내용}</TableCell>
                <TableCell>{record.특이사항}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(index)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MedicalRecordForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingRecord}
      />
    </Box>
  );
};

export default MedicalRecords;
