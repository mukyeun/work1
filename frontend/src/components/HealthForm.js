import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Chip
} from '@mui/material';

// 부위선택 객체 정의
const 부위선택 = {
  "머리/얼굴": {
    "머리": [
      "두통(편두통)",
      "두통(긴장성)",
      "어지럼증",
      "의식장애",
      "기억력저하",
      "집중력저하",
      "발작/경련",
      "뇌진탕",
      "수면장애",
      "편두통",
      "머리울림",
      "두피가려움",
      "두피염증"
    ],
    "눈": [
      "시력저하",
      "충혈",
      "통증",
      "이물감",
      "건조감",
      "가려움",
      "눈물과다",
      "시야흐림",
      "복시",
      "눈꺼풀처짐",
      "백내장",
      "녹내장",
      "비문증",
      "결막염"
    ],
    "코": [
      "비염",
      "비출혈",
      "후각저하",
      "코막힘",
      "콧물",
      "재채기",
      "부비동염",
      "코골이",
      "수면무호흡",
      "비중격만곡"
    ],
    "입/턱": [
      "구내염",
      "잇몸출혈",
      "치통",
      "턱관절통증",
      "입마름",
      "미각이상",
      "구취",
      "치아시림",
      "이갈이",
      "턱관절장애",
      "치주염",
      "충치"
    ],
    "귀": [
      "이명",
      "청력저하",
      "이통",
      "어지럼증",
      "이루",
      "가려움",
      "중이염",
      "외이도염",
      "메니에르병",
      "청각과민",
      "이관기능장애"
    ]
  },
  "목/가슴": {
    "목": [
      "인후통",
      "연하곤란",
      "쉰목소리",
      "림프절종창",
      "경부통증",
      "갑상선종대",
      "편도염",
      "후두염",
      "목소리변화",
      "이물감",
      "경추통증"
    ],
    "가슴": [
      "흉통",
      "두근거림",
      "호흡곤란",
      "기침",
      "가래",
      "천명음",
      "유방통증",
      "유방멍울",
      "흉부압박감",
      "늑골통증",
      "가슴답답함"
    ],
    "심장": [
      "협심증",
      "부정맥",
      "고혈압",
      "저혈압",
      "심근경색",
      "심부전",
      "판막질환",
      "심근염",
      "심낭염",
      "심계항진",
      "실신"
    ],
    "폐": [
      "호흡곤란",
      "기침",
      "가래",
      "객혈",
      "흉통",
      "천식",
      "폐렴",
      "기관지염",
      "폐결핵",
      "기흉",
      "만성폐쇄성폐질환"
    ]
  },
  "배/소화기": {
    "위": [
      "속쓰림",
      "소화불량",
      "구역/구토",
      "복통",
      "팽만감",
      "식욕부진",
      "위염",
      "위궤양",
      "위식도역류",
      "조기포만감",
      "트림"
    ],
    "장": [
      "설사",
      "변비",
      "복통",
      "혈변",
      "장폐색",
      "과민성대장",
      "장염",
      "크론병",
      "궤양성대장염",
      "게실염",
      "장중첩증"
    ],
    "간": [
      "황달",
      "복수",
      "간염",
      "간경변",
      "지방간",
      "간기능이상",
      "간암",
      "담석증",
      "담낭염",
      "간비종대"
    ],
    "췌장": [
      "췌장염",
      "복통",
      "구토",
      "당뇨",
      "지방변",
      "체중감소",
      "황달",
      "췌장암",
      "소화불량"
    ]
  },
  "비뇨생식기": {
    "신장": [
      "혈뇨",
      "단백뇨",
      "부종",
      "요통",
      "고혈압",
      "신부전",
      "신장염",
      "신장결석",
      "다낭신",
      "요로감염"
    ],
    "방광": [
      "빈뇨",
      "야간뇨",
      "배뇨통",
      "혈뇨",
      "요실금",
      "방광염",
      "과민성방광",
      "요로결석",
      "방광암",
      "요도염"
    ],
    "생식기": [
      "성기능장애",
      "불임",
      "월경이상",
      "질염",
      "전립선염",
      "자궁내막증",
      "자궁근종",
      "난소낭종",
      "성병",
      "생식기감염"
    ]
  },
  "팔/다리": {
    "어깨": [
      "관절통",
      "근육통",
      "움직임제한",
      "탈구",
      "염증",
      "회전근개손상",
      "오십견",
      "석회성건염",
      "충돌증후군"
    ],
    "팔/팔꿈치": [
      "관절통",
      "테니스엘보",
      "골프엘보",
      "근육통",
      "저림",
      "부종",
      "건초염",
      "관절염",
      "신경압박"
    ],
    "손/손목": [
      "손목터널증후군",
      "관절염",
      "건초염",
      "저림",
      "부종",
      "통증",
      "방아쇠수지",
      "드퀘르벵건염",
      "손목염좌"
    ],
    "다리": [
      "근육통",
      "관절통",
      "부종",
      "저림",
      "근경련",
      "정맥류",
      "심부정맥혈전증",
      "근육파열",
      "근막통증"
    ],
    "무릎": [
      "관절통",
      "관절염",
      "물멎",
      "인대손상",
      "연골손상",
      "부종",
      "반월상연골손상",
      "슬개골통증",
      "퇴행성관절염"
    ],
    "발/발목": [
      "족저근막염",
      "아킬레스건염",
      "발목염좌",
      "통증",
      "부종",
      "저림",
      "무지외반증",
      "평발",
      "족저신경종"
    ]
  },
  "허리/척추": {
    "허리": [
      "급성 요통",
      "만성 요통",
      "좌골신경통",
      "요추 염좌",
      "요추 디스크",
      "척추관협착증",
      "척추전방전위증",
      "근육경직",
      "요추 압박골절",
      "척추측만증"
    ],
    "척추": [
      "경추통증",
      "흉추통증",
      "요추통증",
      "척추측만증",
      "척추후만증",
      "척추전만증",
      "추간판탈출증",
      "척추분리증",
      "강직성척추염",
      "척추압박골절"
    ]
  },
  "신경/정신": {
    "뇌신경": [
      "두통(편두통)",
      "두통(긴장성)",
      "어지럼증(현훈)",
      "어지럼증(비현훈)",
      "발작/경련",
      "의식장애",
      "기억력저하",
      "집중력저하",
      "손발저림",
      "마비증상",
      "뇌졸중",
      "뇌경색",
      "뇌출혈",
      "치매"
    ],
    "말초신경": [
      "저림",
      "감각이상",
      "근력약화",
      "신경통",
      "손목터널증후군",
      "척추신경압박",
      "대상포진후신경통",
      "삼차신경통",
      "안면신경마비",
      "다발성신경병증"
    ],
    "정신건강": [
      "불면증",
      "우울증",
      "불안장애",
      "공황장애",
      "강박증상",
      "환각/망상",
      "조현병",
      "양극성장애",
      "적응장애",
      "외상후스트레스",
      "섭식장애",
      "중독",
      "자살충동"
    ]
  },
  "관절/근육": {
    "관절": [
      "관절통증",
      "관절염",
      "관절부종",
      "관절강직",
      "관절잠김",
      "관절불안정",
      "류마티스관절염",
      "통풍",
      "퇴행성관절염",
      "건초염"
    ],
    "근육": [
      "근육통",
      "근육경련",
      "근육약화",
      "근육경직",
      "근막통증",
      "근육파열",
      "근육염",
      "근육경련",
      "섬유근통",
      "근육피로"
    ]
  },
  "피부": {
    "피부질환": [
      "발진",
      "가려움",
      "두드러기",
      "습진",
      "건선",
      "여드름",
      "피부감염",
      "탈모",
      "피부건조",
      "색소침착"
    ],
    "외상": [
      "찰과상",
      "열상",
      "타박상",
      "화상",
      "동상",
      "벌레물림",
      "알레르기반응",
      "봉와직염",
      "농양",
      "욕창"
    ]
  },
  "응급증상": {
    "즉시내원": [
      "급성흉통",
      "심한호흡곤란",
      "의식저하",
      "심한두통",
      "경련/발작",
      "대량출혈",
      "심한복통",
      "고열(40도이상)",
      "심한알레르기반응",
      "중독증상"
    ],
    "조기내원": [
      "지속되는 발열",
      "반복되는 구토",
      "지속되는 두통",
      "설명안되는 체중감소",
      "원인모를 출혈",
      "급격한 시력변화",
      "지속되는 복통",
      "반복되는 실신",
      "갑작스러운 마비",
      "심한 관절통증"
    ]
  },
  "내분비": {
    "갑상선": [
      "갑상선기능항진",
      "갑상선기능저하",
      "갑상선결절",
      "갑상선염",
      "목의 압박감",
      "체중변화",
      "피로",
      "불면증",
      "우울",
      "불안"
    ],
    "당뇨": [
      "다음",
      "다뇨",
      "다식",
      "체중감소",
      "피로",
      "시야흐림",
      "상처치유지연",
      "저혈당",
      "고혈당",
      "당뇨합병증"
    ]
  },
  "혈액/면역": {
    "혈액": [
      "빈혈",
      "출혈경향",
      "혈소판감소",
      "백혈구감소",
      "림프절종대",
      "비장비대",
      "혈전증",
      "재생불량성빈혈",
      "백혈병",
      "다발성골수종"
    ],
    "면역": [
      "알레르기",
      "자가면역질환",
      "면역결핍",
      "류마티스질환",
      "전신홍반루푸스",
      "쇼그렌증후군",
      "혈관염",
      "아나필락시스",
      "천식",
      "아토피"
    ]
  }
};

const HealthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    이름: '',
    주민등록번호: '',
    연락처: '',
    키: '',
    몸무게: '',
    bmi: '',
    bmi등급: '',
    대분류: '',
    중분류: '',
    증상: '',
    특이사항: '',
    육체노동: '',
    스트레스: '',
    운동: '',
    기호식: []
  });

  const 기호식_목록 = ['술', '담배', '커피', '탄산음료', '매운식', '단음식'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };

      if (name === '키' || name === '몸무게') {
        const height = name === '키' ? value : prev.키;
        const weight = name === '몸무게' ? value : prev.몸무게;
        const { bmi, bmi등급 } = calculateBMI(height, weight);
        newData.bmi = bmi;
        newData.bmi등급 = bmi등급;
      }

      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleHabitToggle = (habit) => {
    setFormData(prev => ({
      ...prev,
      기호식: prev.기호식.includes(habit)
        ? prev.기호식.filter(h => h !== habit)
        : [...prev.기호식, habit]
    }));
  };

  const handleMainCategory = (e) => {
    setFormData(prev => ({
      ...prev,
      대분류: e.target.value,
      중분류: '',
      증상: ''
    }));
  };

  const handleSubCategory = (e) => {
    setFormData(prev => ({
      ...prev,
      중분류: e.target.value,
      증상: ''
    }));
  };

  const handleSymptom = (e) => {
    setFormData(prev => ({
      ...prev,
      증상: e.target.value
    }));
  };

  // BMI 계산 함수
  const calculateBMI = (height, weight) => {
    if (!height || !weight) return { bmi: '', bmi등급: '' };
    
    const heightInMeter = height / 100;
    const bmi = (weight / (heightInMeter * heightInMeter)).toFixed(1);
    
    let bmi등급 = '';
    if (bmi < 16.0) bmi등급 = '고도 저체중';
    else if (bmi < 18.5) bmi등급 = '저체중';
    else if (bmi < 23.0) bmi등급 = '정상';
    else if (bmi < 25.0) bmi등급 = '과체중';
    else if (bmi < 30.0) bmi등급 = '비만';
    else bmi등급 = '고도비만';

    return { bmi, bmi등급 };
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
            sx={{ bgcolor: 'white' }}
          />

          <TextField
            fullWidth
            placeholder="주민등록번호"
            name="주민등록번호"
            value={formData.주민등록번호}
            onChange={handleChange}
            variant="outlined"
            sx={{ bgcolor: 'white' }}
          />

          <TextField
            fullWidth
            placeholder="연락처"
            name="연락처"
            value={formData.연락처}
            onChange={handleChange}
            variant="outlined"
            sx={{ bgcolor: 'white' }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="키"
              name="키"
              type="number"
              value={formData.키}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              sx={{ bgcolor: 'white' }}
            />

            <TextField
              fullWidth
              placeholder="몸무게"
              name="몸무게"
              type="number"
              value={formData.몸무게}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              sx={{ bgcolor: 'white' }}
            />
          </Box>

          {formData.키 && formData.몸무게 && (
            <Box sx={{ 
              mb: 2, 
              p: 2, 
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              display: 'flex',
              gap: 4
            }}>
              <Typography variant="body1">
                BMI 지수: <strong>{formData.bmi}</strong>
              </Typography>
              <Typography variant="body1" sx={{ 
                color: formData.bmi등급 === '정상' ? '#2e7d32' :
                       ['과체중', '저체중'].includes(formData.bmi등급) ? '#ed6c02' : '#d32f2f'
              }}>
                {formData.bmi등급}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <FormControl fullWidth>
              <Select
                name="대분류"
                value={formData.대분류}
                onChange={handleMainCategory}
                displayEmpty
                renderValue={(value) => value || "대분류"}
                sx={{ bgcolor: 'white' }}
              >
                {Object.keys(부위선택).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Select
                name="중분류"
                value={formData.중분류}
                onChange={handleSubCategory}
                displayEmpty
                disabled={!formData.대분류}
                renderValue={(value) => value || "중분류"}
                sx={{ bgcolor: 'white' }}
              >
                {formData.대분류 && 
                  Object.keys(부위선택[formData.대분류] || {}).map((subCategory) => (
                    <MenuItem key={subCategory} value={subCategory}>
                      {subCategory}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Select
                name="증상"
                value={formData.증상}
                onChange={handleSymptom}
                displayEmpty
                disabled={!formData.중분류}
                renderValue={(value) => value || "증상"}
                sx={{ bgcolor: 'white' }}
              >
                {formData.대분류 && formData.중분류 && 부위선택[formData.대분류][formData.중분류] && 
                  부위선택[formData.대분류][formData.중분류].map((symptom) => (
                    <MenuItem key={symptom} value={symptom}>
                      {symptom}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>

          <TextField
            fullWidth
            placeholder="특이사항"
            name="특이사항"
            multiline
            rows={4}
            value={formData.특이사항}
            onChange={handleChange}
            variant="outlined"
            sx={{ bgcolor: 'white' }}
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

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>기호식</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {기호식_목록.map((habit) => (
                <Chip
                  key={habit}
                  label={habit}
                  onClick={() => handleHabitToggle(habit)}
                  color={formData.기호식.includes(habit) ? "primary" : "default"}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
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