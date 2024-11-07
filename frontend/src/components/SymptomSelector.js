import React, { useState } from 'react';
import { 증상카테고리 } from '../constants/symptomCategories';

const SymptomSelector = ({ onSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSymptom, setSelectedSymptom] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubCategory('');
        setSelectedSymptom('');
    };

    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
        setSelectedSymptom('');
    };

    const handleSymptomChange = (e) => {
        setSelectedSymptom(e.target.value);
    };

    const handleAddSymptom = () => {
        if (selectedSymptom) {
            const newSymptom = {
                category: selectedCategory,
                subCategory: selectedSubCategory,
                symptom: selectedSymptom
            };
            
            setSelectedSymptoms(prev => [...prev, newSymptom]);
            onSelect([...selectedSymptoms, newSymptom]);
            
            // Reset selections
            setSelectedSymptom('');
        }
    };

    const handleRemoveSymptom = (index) => {
        const updatedSymptoms = selectedSymptoms.filter((_, i) => i !== index);
        setSelectedSymptoms(updatedSymptoms);
        onSelect(updatedSymptoms);
    };

    return (
        <div className="symptom-selector">
            <h3>증상 선택</h3>
            <div className="selector-container">
                <div className="selector-group">
                    <label>대분류:</label>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">선택하세요</option>
                        {Object.keys(증상카테고리).map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedCategory && (
                    <div className="selector-group">
                        <label>중분류:</label>
                        <select value={selectedSubCategory} onChange={handleSubCategoryChange}>
                            <option value="">���택하세요</option>
                            {Object.keys(증상카테고리[selectedCategory]).map(subCategory => (
                                <option key={subCategory} value={subCategory}>
                                    {subCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedSubCategory && (
                    <div className="selector-group">
                        <label>증상:</label>
                        <select value={selectedSymptom} onChange={handleSymptomChange}>
                            <option value="">선택하세요</option>
                            {증상카테고리[selectedCategory][selectedSubCategory].map(symptom => (
                                <option key={symptom} value={symptom}>
                                    {symptom}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <button 
                    onClick={handleAddSymptom}
                    disabled={!selectedSymptom}
                >
                    증상 추가
                </button>
            </div>

            <div className="selected-symptoms">
                <h4>선택된 증상 목록</h4>
                {selectedSymptoms.map((item, index) => (
                    <div key={index} className="symptom-item">
                        {`${item.category} > ${item.subCategory} > ${item.symptom}`}
                        <button onClick={() => handleRemoveSymptom(index)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SymptomSelector;
