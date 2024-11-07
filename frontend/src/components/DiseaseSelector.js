import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';

const diseaseCategories = {
  "머리/얼굴": {
    "머리": [
      "두통",
      "편두통",
      "뒷목통증",
      "어지럼증",
      "빈혈성 두통",
      "긴장성 두통",
      "군발성 두통",
      "편두통 전조증상",
      "뇌진탕 후 두통"
    ],
    "눈": [
      "시력저하",
      "충혈",
      "안구건조",
      "눈부심",
      "눈물과다",
      "비문증",
      "안구피로",
      "시야흐림",
      "복시(두 개로 보임)",
      "눈꺼풀 처짐",
      "결막염",
      "녹내장 증상"
    ],
    "코": [
      "비염",
      "축농증",
      "코막힘",
      "콧물",
      "재채기",
      "후각저하",
      "코피",
      "부비동염",
      "알레르기성 비염",
      "비중격만곡증"
    ],
    "입/턱": [
      "잇몸출혈",
      "잇몸염증",
      "턱관절통증",
      "턱관절소리",
      "이갈이",
      "구내염",
      "구취",
      "치통",
      "턱관절장애(TMJ)",
      "부정교합",
      "치주염",
      "치은염"
    ],
    "귀": [
      "이명",
      "난청",
      "어지럼증",
      "이통",
      "중이염",
      "외이도염",
      "청력저하",
      "메니에르병",
    ]
  },
  "목/가슴": {
    "목": [
      "인후통",
      "목디스크",
      "갑상선",
      "쉰목소리",
      "연하곤란",
      "편도염",
      "목이물감",
      "경부통증",
      "후두염",
      "성대결절",
      "림프절종대",
      "경추통증"
    ],
    "가슴": [
      "흉통",
      "호흡곤란",
      "가슴답답",
      "가슴통증",
      "늑간통증",
      "흉부압박감",
      "가슴두근거림",
      "흉막염",
      "늑골골절",
      "흉골염"
    ],
    "심장": [
      "두근거림",
      "부정맥",
      "협심증",
      "심근경색",
      "고혈압",
      "저혈압",
      "심부전",
      "판막질환",
      "심근염",
      "심낭염"
    ],
    "폐": [
      "기침",
      "천식",
      "폐렴",
      "가래",
      "호흡곤란",
      "숨가쁨",
      "흉통",
      "기관지염"
    ]
  },
  "배/소화기": {
    "위": [
      "속쓰림",
      "메스꺼움",
      "소화불량",
      "위통",
      "위경련",
      "조기포만감",
      "식욕부진",
      "구토"
    ],
    "장": [
      "복통",
      "설사",
      "변비",
      "복부팽만",
      "장경련",
      "혈변",
      "과민성대장",
      "장폐색"
    ],
    "간": [
      "피로",
      "황달",
      "복부팽만",
      "식욕부진",
      "오심",
      "구토",
      "우상복부통증"
    ],
    "담낭": [
      "담석",
      "복통",
      "구토",
      "소화불량",
      "우상복부통증",
      "황달"
    ]
  },
  "팔/다리": {
    "어깨": [
      "어깨통증",
      "오십견",
      "회전근개염",
      "석회화건염",
      "어깨충돌증후군",
      "관절와순파열"
    ],
    "팔/팔꿈치": [
      "테니스엘보",
      "골프엘보",
      "관절염",
      "신경압박",
      "근육통",
      "건초염"
    ],
    "손/손목": [
      "손목터널",
      "관절염",
      "건초염",
      "방아쇠수지",
      "드퀘르"
    ],
    "엉덩이": [
      "좌골신경통",
      "관절염",
      "고관절통",
      "대퇴골두무혈성괴사",
      "엉덩이통증"
    ],
    "무릎": [
      "관절통",
      "연골손상",
      "십자인대파열",
      "반월상연골파열"
    ],
    "발/발목": [
      "족저근막염",
      "아킬레스건",
      "족저근막염",
      "족저근막염",
      "족저근막염",
      "족저근막염"
    ]
  },
  "허리/척추": {
    "허리": [
      "요통",
      "디스크",
      "좌골신경통",
      "좌골신경통",
      "좌골신경통",
      "좌골신경통",
      "좌골신경통"
    ],
    "척추": [
      "척추측만증",
      "척추협착증",
      "척추협착증",
      "척추협착증",
      "척추협착증",
      "척추협착증",
      "척추협착증"
    ]
  },
  "기타": {
    "피부": [
      "발진",
      "가려움",
      "두드러기",
      "발진",
      "가려움",
      "두드러기",
      "발진",
      "가려움",
      "두드러기",
      "발진",
      "가려움",
      "두드러기"
    ],
    "호르몬": [
      "갑상선",
      "당뇨",
      "갑상선",
      "당뇨",
      "갑상선",
      "당뇨",
      "갑상선",
      "당뇨",
      "갑상선",
      "당뇨",
      "갑상선",
      "당뇨"
    ],
    "혈액": [
      "빈혈",
      "혈압",
      "빈혈",
      "혈압",
      "빈혈",
      "혈압",
      "빈혈",
      "혈압",
      "빈혈",
      "혈압",
      "빈혈",
      "혈압"
    ],
    "정신": [
      "불면증",
      "우울",
      "불안",
      "불면증",
      "우울",
      "불안",
      "불면증",
      "우울",
      "불안",
      "불면증",
      "우울",
      "불안"
    ]
  }
};

const DiseaseSelector = ({ selectedDisease, onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory('');
    onChange('');
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
    onChange('');
  };

  const handleDiseaseChange = (event) => {
    onChange(event.target.value);
  };

  // 선택된 카테고리의 하위 카테고리 목록을 중복 없이 가져오기
  const getSubCategories = () => {
    if (!selectedCategory) return [];
    return [...new Set(Object.keys(diseaseCategories[selectedCategory] || {}))];
  };

  // 선택된 하위 카테고리의 증상 목록을 중복 없이 가져오기
  const getSymptoms = () => {
    if (!selectedCategory || !selectedSubCategory) return [];
    return [...new Set(diseaseCategories[selectedCategory]?.[selectedSubCategory] || [])];
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
      {/* 대분류 선택 */}
      <FormControl fullWidth>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          renderValue={value => value || "대분류"}
          sx={{ 
            bgcolor: 'white',
            '& .MuiSelect-select': {
              padding: '16.5px 14px'
            }
          }}
        >
          {Object.keys(diseaseCategories).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 중분류 선택 */}
      <FormControl fullWidth>
        <Select
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
          displayEmpty
          disabled={!selectedCategory}
          renderValue={value => value || "중분류"}
          sx={{ 
            bgcolor: 'white',
            '& .MuiSelect-select': {
              padding: '16.5px 14px'
            }
          }}
        >
          {getSubCategories().map((subCategory) => (
            <MenuItem key={subCategory} value={subCategory}>
              {subCategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 소분류(증상) 선택 */}
      <FormControl fullWidth>
        <Select
          value={selectedDisease}
          onChange={handleDiseaseChange}
          displayEmpty
          disabled={!selectedSubCategory}
          renderValue={value => value || "증상"}
          sx={{ 
            bgcolor: 'white',
            '& .MuiSelect-select': {
              padding: '16.5px 14px'
            }
          }}
        >
          {getSymptoms().map((disease) => (
            <MenuItem key={disease} value={disease}>
              {disease}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DiseaseSelector;
