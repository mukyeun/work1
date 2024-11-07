import React, { useState } from 'react';

const PhysicalInfoForm = ({ onSubmit }) => {
    const [physicalInfo, setPhysicalInfo] = useState({
        bloodPressure: {
            systolic: '',  // 수축기 혈압
            diastolic: '', // 이완기 혈압
        },
        heartRate: '',     // 심박수
        temperature: '',   // 체온
        bloodSugar: '',    // 혈당
        oxygenSaturation: '', // 산소포화도
    });

    const handleChange = (category, field, value) => {
        setPhysicalInfo(prev => ({
            ...prev,
            [category]: field 
                ? { ...prev[category], [field]: value }
                : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(physicalInfo);
    };

    return (
        <div className="physical-info-form">
            <h3>신체 정보</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h4>혈압</h4>
                    <div className="form-group">
                        <label>수축기 혈압 (mmHg):</label>
                        <input
                            type="number"
                            value={physicalInfo.bloodPressure.systolic}
                            onChange={(e) => handleChange('bloodPressure', 'systolic', e.target.value)}
                            placeholder="예: 120"
                        />
                    </div>
                    <div className="form-group">
                        <label>이완기 혈압 (mmHg):</label>
                        <input
                            type="number"
                            value={physicalInfo.bloodPressure.diastolic}
                            onChange={(e) => handleChange('bloodPressure', 'diastolic', e.target.value)}
                            placeholder="예: 80"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>심박수 (bpm):</label>
                    <input
                        type="number"
                        value={physicalInfo.heartRate}
                        onChange={(e) => handleChange('heartRate', null, e.target.value)}
                        placeholder="예: 75"
                    />
                </div>

                <div className="form-group">
                    <label>체온 (°C):</label>
                    <input
                        type="number"
                        step="0.1"
                        value={physicalInfo.temperature}
                        onChange={(e) => handleChange('temperature', null, e.target.value)}
                        placeholder="예: 36.5"
                    />
                </div>

                <div className="form-group">
                    <label>혈당 (mg/dL):</label>
                    <input
                        type="number"
                        value={physicalInfo.bloodSugar}
                        onChange={(e) => handleChange('bloodSugar', null, e.target.value)}
                        placeholder="예: 100"
                    />
                </div>

                <div className="form-group">
                    <label>산소포화도 (%):</label>
                    <input
                        type="number"
                        value={physicalInfo.oxygenSaturation}
                        onChange={(e) => handleChange('oxygenSaturation', null, e.target.value)}
                        placeholder="예: 98"
                    />
                </div>

                <button type="submit">저장</button>
            </form>
        </div>
    );
};

export default PhysicalInfoForm;
