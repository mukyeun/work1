import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Container
} from '@mui/material';
import HealthForm from './HealthForm';
import PulseWaveData from './PulseWaveData';
import MedicalRecords from './MedicalRecords';

// TabPanel 컴포넌트 정의
const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const PatientDetail = () => {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const [탭값, set탭값] = useState(0);
  const [환자정보, set환자정보] = useState({
    이름: "",
    주민등록번호: "",
    연락처: "",
    키: "",
    몸무게: "",
    혈액형: "",
    특이사항: ""
  });

  const handleTabChange = (event, newValue) => {
    set탭값(newValue);
  };

  const 저장하기 = async (데이터) => {
    try {
      set환자정보(데이터);
      alert('저장되었습니다.');
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'normal' }}>
          환자 상세 정보
        </Typography>
        
        <Tabs 
          value={탭값} 
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              backgroundColor: '#4a77d4',
              height: '3px'
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              minWidth: 100,
              fontSize: '1rem'
            }
          }}
        >
          <Tab label="기본 정보" />
          <Tab label="맥파 데이터" />
          <Tab label="진료 기록" />
        </Tabs>
        
        <TabPanel value={탭값} index={0}>
          <HealthForm 환자정보={환자정보} 저장하기={저장하기} />
        </TabPanel>
        <TabPanel value={탭값} index={1}>
          <PulseWaveData />
        </TabPanel>
        <TabPanel value={탭값} index={2}>
          <MedicalRecords />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default PatientDetail;
