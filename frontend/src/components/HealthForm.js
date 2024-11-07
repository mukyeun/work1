import React, { useState } from 'react';
import {
  Paper,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  Chip,
  Divider
} from '@mui/material';

const HealthForm = () => {
  const [formData, setFormData] = useState({
    // 기본 정보
    이름: '',
    주민등록번호: '',
    연락처: '',
    키: '',
    체중: '',
    혈당: '',
    체온: '',
    
    // 질환 선택
    질환대분류: '',
    선택된질환: [],
    
    // 맥파 데이터
    맥파데이터: '',
    메모: '',
    대분류: '',
    중분류: '',
    소분류: '',
    선택된증상: []
  });

  const [bmiData, setBmiData] = useState({
    bmi: '',
    bmi등급: ''
  });

  // 질환 카테고리 데이터
  const 질환카테고리 = {
    "대사성질환": ["당뇨", "혈압", "고지혈증", "비만"],
    "심장질환": ["협심증", "심근경색"],
    "간담도질환": ["간염", "간경화", "담석증", "담낭염"],
    "신장질환": ["만성신장염", "방광염", "요도염", "과민성방광", "요로 및 신장결석"],
    "호흡기질환": ["인후염", "편도선염", "알레르성 천식", "기관지염", "폐렴"],
    "소화기질환": ["만성위염", "위 십이지장 궤양", "역류성식도염", "변비", "설사", "과민성대장", "치질"],
    "피부질환": ["알레르기", "아토피", "습진", "두드러기", "건선", "모낭염", "여드름", "백반증"],
    "이비인후과질환": ["비염", "축농증", "인후염", "중이염", "이석증", "이명", "백내장", "녹내장"],
    "통증질환": ["목", "어깨", "팔꿈치", "손목", "손가락", "등", "허리", "골반", "고관절", "무릎", "발목", "발가락"],
    "정신질환": ["자율신경실조증", "우울증", "정신분열증", "각종 트라우마"]
  };

  // 신체 부위별 증상 카테고리
  const 증상카테고리 = {
    "두경부": {
        "두통": ["편두통", "긴장성두통", "군발성두통", "뇌출혈성두통", "수막염성두통"],
        "뇌신경": ["뇌경색", "뇌출혈", "뇌종양", "뇌염", "수막염"],
        "안면부": ["안면마비", "안면경련", "삼차신경통", "안면외상", "턱관절장애"],
        "시각계": ["시력저하", "충혈", "백내장", "녹내장", "망막질환", "안구건조"],
        "청각계": ["난청", "이명", "중이염", "어지럼증", "메니에르병"],
        "비강/부비동": ["비염", "축농증", "비중격만곡", "후각저하", "비출혈"],
        "구강/인후": ["구내염", "치주염", "편도염", "인후통", "연하곤란"]
    },
    "경부/흉부": {
        "경추": ["목디스크", "경추통", "거북목증후군", "경추염좌", "경추골절"],
        "갑상선": ["갑상선기능항진", "갑상선기능저하", "갑상선결절", "갑상선염"],
        "기관지/폐": ["기침", "천식", "폐렴", "기관지염", "폐결핵", "폐암"],
        "심장": ["협심증", "심근경색", "부정맥", "심부전", "판막질환"],
        "유방": ["유방통", "유방종양", "유방염", "유방경화", "유방분비물"]
    },
    "복부/소화기": {
        "식도": ["역류성식도염", "식도염", "식도경련", "식도암"],
        "위": ["위염", "위궤양", "위암", "소화불량", "구역/구토"],
        "간/담도": ["간염", "간경화", "지방간", "담석", "담낭염"],
        "췌장": ["췌장염", "췌장암", "췌장기능부전"],
        "소장/대장": ["장염", "과민성대장증후군", "크론병", "대장염", "대장암"],
        "항문": ["치질", "치루", "치열", "항문농양", "항문출혈"]
    },
    "요추/척추": {
        "경추": ["경추디스크", "경추협착증", "경추염좌"],
        "흉추": ["흉추디스크", "흉추협착증", "흉추측만증"],
        "요추": ["요추디스크", "요추협착증", "요추전방전위증"],
        "천추/미추": ["천추통", "미추통", "천미추증후군"],
        "척추전반": ["척추측만증", "강직성척추염", "척추종양"]
    },
    "상지": {
        "어깨": ["회전근개염", "오십견", "어깨충돌증후군", "어깨탈구"],
        "상완": ["상완골절", "상완신경통", "근육파열"],
        "팔꿈치": ["테니스엘보", "골프엘보", "관절염", "관절강직"],
        "전완": ["전완골절", "구획증후군", "신경압박"],
        "손목": ["손목터널증후군", "건초염", "관절염", "손목골절"],
        "수지": ["방아쇠수지", "듀피트렌구축", "골절", "관절염"]
    },
    "하지": {
        "고관절": ["고관절염", "대퇴골두무혈성괴사", "고관절충돌증후군"],
        "대퇴": ["대퇴골절", "근육파열", "근막통증증후군"],
        "슬관절": ["반월상연골파열", "십자인대파열", "관절염", "슬개골연골연화증"],
        "하퇴": ["하퇴골절", "구획증후군", "정맥류"],
        "족관절": ["족관절염좌", "아킬레스건염", "족관절불안정성"],
        "족부": ["족저근막염", "무지외반증", "중족골통", "발가락변형"]
    },
    "비뇨생식기": {
        "신장": ["신장염", "신부전", "신장결석", "신장암"],
        "요관/방광": ["요로결석", "방광염", "과민성방광", "요실금"],
        "전립선": ["전립선염", "전립선비대", "전립선암"],
        "생식기": ["자궁근종", "난소낭종", "자궁내막증", "불임"]
    },
    "내분비/대사": {
        "당뇨": ["제1형당뇨", "제2형당뇨", "임신성당뇨", "당뇨합병증"],
        "갑상선": ["갑상선기능항진", "갑상선기능저하", "갑상선결절"],
        "부신": ["쿠싱증후군", "에디슨병", "부신종양"],
        "뇌하수체": ["말단비대증", "범뇌하수체기능저하증"],
        "대사질환": ["고지혈증", "통풍", "비만", "대사증후군"]
    },
    "면역/혈액": {
        "자가면역": ["류마티스관절염", "전신홍반루푸스", "강직성척추염"],
        "알레르기": ["아토피", "천식", "알레르기비염", "약물알레르기"],
        "혈액질환": ["빈혈", "백혈병", "림프종", "혈소판감소증"],
        "면역결핍": ["후천성면역결핍증", "원발성면역결핍증"]
    },
    "정신/신경": {
        "기분장애": ["우울증", "양극성장애", "불안장애", "공황장애"],
        "인지장애": ["치매", "경도인지장애", "주의력결핍장애"],
        "수면장애": ["불면증", "수면무호흡", "하지불안증후군"],
        "중독": ["알코올중독", "약물중독", "게임중독"]
    },
    "응급/외상": {
        "외상": ["골절", "탈구", "염좌", "열상", "타박상"],
        "화상": ["화염화상", "열탕화상", "전기화상", "화학화상"],
        "중독": ["약물중독", "식중독", "일산화탄소중독"],
        "응급질환": ["심정지", "쇼크", "의식저하", "경련"]
    },
    "피부": {
        "감염성": ["백선", "옴", "대상포진", "농가진", "봉��직염"],
        "알레르기": ["아토피", "접촉성피부염", "두드러기", "혈관부종"],
        "자가면역": ["건선", "루푸스", "백반증", "천포창"],
        "종양": ["피부암", "양성종양", "색소성병변", "기저세포암"],
        "모발/조갑": ["탈모", "조갑진균증", "손발톱영양장애", "다한증"]
    },
    "혈액/면역": {
        "적혈구": ["빈혈", "적혈구증가증", "철결핍성빈혈", "재생불량성빈혈"],
        "백혈구": ["백혈병", "림프종", "면역결핍", "호중구감소증"],
        "혈소판": ["혈소판감소증", "혈소판증가증", "특발성혈소판감소증"],
        "응고장애": ["혈우병", "혈전증", "파종성혈관내응고", "폰빌레브란트병"],
        "자가면역": ["류마티스관절염", "전신홍반루푸스", "혈관염"],
        "알레르기": ["약물알레르기", "음식알레르기", "라텍스알레르기", "계절성알레르기"]
    },
    "정신/신경": {
        "기분장애": ["우울증", "양극성장애", "불안장애", "공황장애"],
        "인지장애": ["치매", "경도인지장애", "주의력결핍장애"],
        "수면장애": ["불면증", "수면무호흡", "하지불안증후군", "기면증"],
        "중독": ["알코올중독", "약물중독", "게임중독", "니코틴중독"],
        "발달장애": ["자폐스펙트럼", "학습장애", "언어발달지연", "틱장애"],
        "신경발달": ["뇌성마비", "근육병", "척수성근위축증"],
        "정신증": ["조현병", "망상장애", "해리장애", "강박장애"]
    },
    "노인의학": {
        "신체기능": ["보행장애", "낙상", "실금", "연하장애"],
        "인지기능": ["치매", "섬망", "우울", "불면"],
        "노인증후군": ["허약", "다발성약물복용", "영양실조", "압박궤양"],
        "노인성질환": ["파킨슨병", "골다공증", "관절염", "노인성난청"]
    },
    "소아청소년": {
        "성장발달": ["성장지연", "성조숙증", "저신장", "비만"],
        "선천성": ["선천성심장병", "선천성대사이상", "염색체이상", "선천성기형"],
        "소아감염": ["수족구병", "백일해", "로타바이러스", "크룹", "성홍열"],
        "소아알레르기": ["아토피", "천식", "식품알레르기", "알레르기비염"]
    },
    "응급": {
        "외상": ["골절", "탈구", "염좌", "열상", "타박상", "두부외상"],
        "화상": ["화염화상", "열탕화상", "전기화상", "화학화상", "방사선화상"],
        "중독": ["약물중독", "식중독", "일산화탄소중독", "농약중독"],
        "환경응급": ["열사병", "저체온증", "감전", "익수", "고산병"],
        "알레르기": ["아나필락시스", "혈관부종", "심한 알레르기반응"],
        "출혈": ["대량출혈", "위장관출혈", "비출혈", "산후출혈"],
        "응급질환": ["심정지", "쇼크", "의식저하", "경련", "급성복증"]
    }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === '키' || name === '체중') {
      const height = name === '키' ? Number(value) : Number(formData.키);
      const weight = name === '체중' ? Number(value) : Number(formData.체중);
      
      if (height > 0 && weight > 0) {
        const heightInMeter = height / 100;
        const bmi = (weight / (heightInMeter * heightInMeter)).toFixed(1);
        
        let bmi등급 = '';
        if (bmi < 18.5) bmi등급 = '저체중';
        else if (bmi < 23.0) bmi등급 = '정상';
        else if (bmi < 25.0) bmi등급 = '과체중';
        else if (bmi < 30.0) bmi등급 = '비만';
        else bmi등급 = '고도비만';

        setBmiData({ bmi, bmi등급 });
      }
    }
  };

  const handleDiseaseSelect = (disease) => {
    setFormData(prev => ({
      ...prev,
      선택된질환: prev.선택된질환.includes(disease)
        ? prev.선택된질환.filter(d => d !== disease)
        : [...prev.선택된질환, disease]
    }));
  };

  // 증상 선택 핸들러
  const handleSymptomChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === '대분류' && { 중분류: '', 소분류: '' }),
      ...(name === '중분류' && { 소분류: '' })
    }));
  };

  // 증상 선택/삭제 핸들러
  const handleSymptomSelect = (symptom) => {
    // 증상에서 구체적인 설명 부분 추출
    const symptomDetail = symptom.includes('(') ? 
        symptom.substring(symptom.indexOf('(') + 1, symptom.indexOf(')')) : '';
    
    setFormData(prev => {
        const isAlreadySelected = prev.선택된증상.includes(symptom);
        
        // 이미 선택된 증상이면 제거, 아니면 추가
        const updated선택된증상 = isAlreadySelected
            ? prev.선택된증상.filter(s => s !== symptom)
            : [...prev.선택된증상, symptom];
            
        return {
            ...prev,
            선택된증상: updated선택된증상,
            // 증상 설명도 함께 저장
            증상설명: {
                ...prev.증상설명,
                [symptom.split('(')[0]]: symptomDetail
            }
        };
    });
  };

  return (
    <Paper elevation={1} sx={{ p: 3, maxWidth: 800, margin: 'auto', borderRadius: '8px' }}>
      {/* 기본 정보 섹션 */}
      <Typography variant="h6" sx={{ mb: 2 }}>기본 정보</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="이름"
          name="이름"
          value={formData.이름}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="생년월일"
          name="생년월일"
          value={formData.생년월일}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
        />
        <FormControl fullWidth>
          <Select
            name="성별"
            value={formData.성별}
            onChange={handleChange}
            displayEmpty
            renderValue={(value) => value || "성별 선택"}
          >
            <MenuItem value="남성">남성</MenuItem>
            <MenuItem value="여성">여성</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="연락처"
          name="연락처"
          value={formData.연락처}
          onChange={handleChange}
          placeholder="010-0000-0000"
        />
        <TextField
          fullWidth
          label="주소"
          name="주소"
          value={formData.주소}
          onChange={handleChange}
          multiline
          rows={2}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 증상 선택 섹션 */}
      <Typography variant="h6" sx={{ mb: 2 }}>증상 선택</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <Select
            name="대분류"
            value={formData.대분류}
            onChange={handleSymptomChange}
            displayEmpty
          >
            <MenuItem value=""><em>신체 부위 선택</em></MenuItem>
            {Object.keys(증상카테고리).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {formData.대분류 && (
          <FormControl fullWidth>
            <Select
              name="중분류"
              value={formData.중분류}
              onChange={handleSymptomChange}
              displayEmpty
            >
              <MenuItem value=""><em>세부 부위 선택</em></MenuItem>
              {Object.keys(증상카테고리[formData.대분류]).map((subCategory) => (
                <MenuItem key={subCategory} value={subCategory}>
                  {subCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {formData.중분류 && (
          <FormControl fullWidth>
            <Select
              name="소분류"
              value={formData.소분류}
              onChange={handleSymptomChange}
              displayEmpty
            >
              <MenuItem value=""><em>구체적 증상 선택</em></MenuItem>
              {증상카테고리[formData.대분류][formData.중분류].map((symptom) => (
                <MenuItem key={symptom} value={symptom}>
                  {symptom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* 선택된 증상 표시 */}
        {formData.선택된증상?.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">선택된 증상:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {formData.선택된증상.map((symptom) => (
                <Chip
                  key={symptom}
                  label={symptom}
                  onDelete={() => handleSymptomSelect(symptom)}
                  color="primary"
                  variant="outlined"
                  sx={{
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      height: 'auto',
                      padding: '8px'
                    }
                  }}
                  title={symptom.includes('(') ? 
                    symptom.substring(symptom.indexOf('(') + 1, symptom.indexOf(')')) : 
                    ''}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* BMI 계산 섹션 */}
      <Typography variant="h6" sx={{ mb: 2 }}>신체 정보</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="키"
          name="키"
          type="number"
          value={formData.키}
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          label="몸무게"
          name="몸무게"
          type="number"
          value={formData.몸무게}
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
      </Box>

      <Box sx={{ 
        p: 2, 
        bgcolor: '#f5f5f5',
        borderRadius: 1,
        border: '1px solid #e0e0e0'
      }}>
        <Typography variant="body1">
          BMI 지수: <strong>{bmiData.bmi || '-'}</strong>
        </Typography>
        <Typography variant="body1" sx={{ 
          color: bmiData.bmi등급 === '정상' ? '#2e7d32' :
                 ['과체중', '저체중'].includes(bmiData.bmi등급) ? '#ed6c02' : '#d32f2f'
        }}>
          체중 분류: <strong>{bmiData.bmi등급 || '-'}</strong>
        </Typography>
      </Box>

      {/* 맥파 데이터 섹션 */}
      <Typography variant="h6" sx={{ mb: 2 }}>맥파 데이터</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="맥파 데이터"
          name="맥파데이터"
          value={formData.맥파데이터}
          onChange={handleChange}
          multiline
          rows={2}
        />
        <TextField
          fullWidth
          label="메모"
          name="메모"
          value={formData.메모}
          onChange={handleChange}
          multiline
          rows={2}
        />
      </Box>
    </Paper>
  );
};

export default HealthForm;