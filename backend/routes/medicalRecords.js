const express = require('express');
const router = express.Router();
const db = require('../db'); // 데이터베이스 연결 설정

// 환자별 진료 기록 조회
router.get('/medical-records/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const query = `
      SELECT * FROM medical_records 
      WHERE patient_id = ? 
      ORDER BY 진료일자 DESC
    `;
    
    const [records] = await db.query(query, [patientId]);
    res.json(records);
  } catch (error) {
    console.error('진료 기록 조회 오류:', error);
    res.status(500).json({ message: '진료 기록 조회 중 오류가 발생했습니다.' });
  }
});

// 진료 기록 저장
router.post('/medical-records', async (req, res) => {
  try {
    const { patientId, 진료일자, 주증상, 진단내용, 처방내용, 특이사항 } = req.body;
    const query = `
      INSERT INTO medical_records 
      (patient_id, 진료일자, 주증상, 진단내용, 처방내용, 특이사항) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    await db.query(query, [patientId, 진료일자, 주증상, 진단내용, 처방내용, 특이사항]);
    res.json({ message: '저장되었습니다.' });
  } catch (error) {
    console.error('진료 기록 저장 오류:', error);
    res.status(500).json({ message: '저장 중 오류가 발생했습니다.' });
  }
});

// 진료 기록 수정
router.put('/medical-records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 진료일자, 주증상, 진단내용, 처방내용, 특이사항 } = req.body;
    const query = `
      UPDATE medical_records 
      SET 진료일자 = ?, 주증상 = ?, 진단내용 = ?, 처방내용 = ?, 특이사항 = ?
      WHERE id = ?
    `;
    
    await db.query(query, [진료일자, 주증상, 진단내용, 처방내용, 특이사항, id]);
    res.json({ message: '수정되었습니다.' });
  } catch (error) {
    console.error('진료 기록 수정 오류:', error);
    res.status(500).json({ message: '수정 중 오류가 발생했습니다.' });
  }
});

// 진료 기록 삭제
router.delete('/medical-records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM medical_records WHERE id = ?';
    
    await db.query(query, [id]);
    res.json({ message: '삭제되었습니다.' });
  } catch (error) {
    console.error('진료 기록 삭제 오류:', error);
    res.status(500).json({ message: '삭제 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
