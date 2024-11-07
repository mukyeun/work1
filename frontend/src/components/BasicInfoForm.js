import React, { useState } from 'react';

const BasicInfoForm = ({ onSubmit }) => {
    const [basicInfo, setBasicInfo] = useState({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBasicInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(basicInfo);
    };

    return (
        <div className="basic-info-form">
            <h3>기본 정보</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>이름:</label>
                    <input
                        type="text"
                        name="name"
                        value={basicInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>나이:</label>
                    <input
                        type="number"
                        name="age"
                        value={basicInfo.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>성별:</label>
                    <select 
                        name="gender" 
                        value={basicInfo.gender} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">선택하세요</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>신장(cm):</label>
                    <input
                        type="number"
                        name="height"
                        value={basicInfo.height}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>체중(kg):</label>
                    <input
                        type="number"
                        name="weight"
                        value={basicInfo.weight}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">저장</button>
            </form>
        </div>
    );
};

export default BasicInfoForm;
