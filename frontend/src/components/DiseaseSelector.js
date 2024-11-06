import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Chip
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const diseaseCategories = {
  "대사성 질환": {
    "당뇨": ["제1형 당뇨", "제2형 당뇨"],
    "고혈압": ["본태성 고혈압", "이차성 고혈압"],
    "고지혈증": ["고콜레스테롤혈증", "고중성지방혈증"]
  },
  "심장질환": {
    "관상동맥질환": ["협심증", "심근경색"],
    "부정맥": ["심방세동", "심실세동"],
    "심부전": ["급성 심부전", "만성 심부전"]
  },
  "호흡기 질환": {
    "천식": ["알레르기성 천식", "비알레르기성 천식"],
    "만성폐쇄성폐질환": ["만성 기관지염", "폐기종"],
    "폐렴": ["세균성 폐렴", "바이러스성 폐렴"]
  }
};

const DiseaseSelector = ({ selectedDiseases = [], onChange }) => {
  const [open, setOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({});

  const handleToggle = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleDiseaseSelect = (disease) => {
    const newSelection = selectedDiseases.includes(disease)
      ? selectedDiseases.filter(d => d !== disease)
      : [...selectedDiseases, disease];
    onChange(newSelection);
  };

  return (
    <Box>
      <Button 
        variant="outlined" 
        onClick={() => setOpen(true)}
        sx={{ mb: 1 }}
      >
        질환 선택
      </Button>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedDiseases.map((disease) => (
          <Chip
            key={disease}
            label={disease}
            onDelete={() => handleDiseaseSelect(disease)}
          />
        ))}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>질환 선택</DialogTitle>
        <DialogContent>
          <List>
            {Object.entries(diseaseCategories).map(([category, subCategories]) => (
              <Box key={category}>
                <ListItem button onClick={() => handleToggle(category)}>
                  <ListItemText primary={category} />
                  {openCategories[category] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCategories[category]} timeout="auto">
                  <List component="div" disablePadding>
                    {Object.entries(subCategories).map(([subCategory, diseases]) => (
                      diseases.map((disease) => (
                        <ListItem 
                          button 
                          key={disease}
                          onClick={() => handleDiseaseSelect(disease)}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText primary={disease} />
                        </ListItem>
                      ))
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DiseaseSelector;
