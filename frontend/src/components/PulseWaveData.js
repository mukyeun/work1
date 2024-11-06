import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const PulseWaveData = () => {
  const [맥파데이터] = useState([
    {
      측정일시: '2024-03-14 10:30',
      수축기혈압: 120,
      이완기혈압: 80,
      맥박수: 75,
      평균혈압: 93,
      특이사항: '정상'
    },
    // 더미 데이터 추가
  ]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              맥파 측정 기록
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>측정일시</TableCell>
                    <TableCell align="right">수축기혈압</TableCell>
                    <TableCell align="right">이완기혈압</TableCell>
                    <TableCell align="right">맥박수</TableCell>
                    <TableCell align="right">평균혈압</TableCell>
                    <TableCell>특이사항</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {맥파데이터.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.측정일시}</TableCell>
                      <TableCell align="right">{row.수축기혈압}</TableCell>
                      <TableCell align="right">{row.이완기혈압}</TableCell>
                      <TableCell align="right">{row.맥박수}</TableCell>
                      <TableCell align="right">{row.평균혈압}</TableCell>
                      <TableCell>{row.특이사항}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PulseWaveData;
