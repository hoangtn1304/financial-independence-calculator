import { useState } from 'react';
import tuitionVAS from '../data/tuition_vas_sala.json';

function InputForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    currentAsset: '',
    annualIncome: '',
    annualLivingCost: '',
    livingInflation: '',
    expectedCAGR: '',
    tuitionInflation: '',
    selectedSchool: '',
  });

  const [tuitionData, setTuitionData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'selectedSchool') {
      if (value === 'VAS_SALA') {
        setTuitionData(tuitionVAS);
      } else {
        setTuitionData(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, tuitionData });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
      
      <label className="flex flex-col">
  Tài sản ròng hiện tại (tỷ VND):
  <input
    type="number"
    name="currentAsset"
    value={formData.currentAsset}
    onChange={handleChange}
    required
    className="border p-2 rounded mt-1"
  />
</label>

<label className="flex flex-col">
  Thu nhập ròng hàng năm (tỷ VND):
  <input
    type="number"
    name="annualIncome"
    value={formData.annualIncome}
    onChange={handleChange}
    required
    className="border p-2 rounded mt-1"
  />
</label>

<label className="flex flex-col">
  Chi tiêu sinh hoạt hàng năm (tỷ VND):
  <input
    type="number"
    name="annualLivingCost"
    value={formData.annualLivingCost}
    onChange={handleChange}
    required
    className="border p-2 rounded mt-1"
  />
</label>

<label className="flex flex-col">
  Lạm phát chi tiêu sinh hoạt (%/năm):
  <input
    type="number"
    step="0.1"
    name="livingInflation"
    value={formData.livingInflation}
    onChange={handleChange}
    required
    className="border p-2 rounded mt-1"
  />
</label>

<label className="flex flex-col">
  CAGR kỳ vọng cho đầu tư (%/năm):
  <input
    type="number"
    step="0.1"
    name="expectedCAGR"
    value={formData.expectedCAGR}
    onChange={handleChange}
    required
    className="border p-2 rounded mt-1"
  />
</label>

<label className="flex flex-col">
  Lạm phát học phí (%/năm):
  <input
    type="number"
    step="0.1"
    name="tuitionInflation"
    value={formData.tuitionInflation}
    onChange={handleChange}
    required
    className="border p-2 rounded mt-1"
  />
</label>

<label className="flex flex-col">
        Chọn trường quốc tế:
        <select
          name="selectedSchool"
          value={formData.selectedSchool}
          onChange={handleChange}
          required
          className="border p-2 rounded mt-1"
        >
          <option value="">-- Chọn trường --</option>
          <option value="VAS_SALA">VAS Sala</option>
        </select>
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Tính toán
      </button>
    </form>
  );
}

export default InputForm;