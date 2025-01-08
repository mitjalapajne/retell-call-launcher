import CallInterface from "@/components/CallInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Retell AI Call Demo</h1>
      <CallInterface />
    </div>
  );
};

export default Index;