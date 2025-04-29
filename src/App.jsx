import InputForm from './components/InputForm';

function App() {
  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // Chỗ này sau mình sẽ xử lý tính toán FI
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <InputForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;