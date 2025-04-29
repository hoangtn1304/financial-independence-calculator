import { useState } from 'react';
import InputForm from './components/InputForm';
import { simulateFinancialPlan } from './utils/simulateFinancialPlan';

function App() {
  const [simulationResult, setSimulationResult] = useState([]);
  const [graduateYears, setGraduateYears] = useState(null);

  const handleFormSubmit = (formData) => {
    const result = simulateFinancialPlan(formData);
    setSimulationResult(result.simulation);
    setGraduateYears(result.graduateYears);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <InputForm onSubmit={handleFormSubmit} />

      {graduateYears && (
        <div className="mt-4 p-4 bg-blue-100 rounded">
          🎓 Bé 1 tốt nghiệp đại học năm: <strong>{graduateYears.child1}</strong><br />
          🎓 Bé 2 tốt nghiệp đại học năm: <strong>{graduateYears.child2}</strong>
        </div>
      )}

      {simulationResult.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Kết quả mô phỏng</h2>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Năm</th>
                <th className="p-2 border">Tài sản cuối năm (VND)</th>
                <th className="p-2 border">Chi tiêu sinh hoạt (VND)</th>
                <th className="p-2 border">Học phí (VND)</th>
                <th className="p-2 border">Tổng chi phí (VND)</th>
              </tr>
            </thead>
            <tbody>
              {simulationResult.map((item) => (
                <tr key={item.year} className="text-center">
                  <td className="p-2 border">{item.year}</td>
                  <td className="p-2 border">{item.asset.toLocaleString()}</td>
                  <td className="p-2 border">{item.livingCost.toLocaleString()}</td>
                  <td className="p-2 border">{(item.tuitionCost + (item.universityCost || 0)).toLocaleString()}</td>
                  <td className="p-2 border">{item.totalCost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;