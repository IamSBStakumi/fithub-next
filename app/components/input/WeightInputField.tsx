type Props = {
  weight: string;
  setWeight: (weight: string) => void;
  handleSubmit: () => void;
};

const WeightInputField = ({ weight, setWeight, handleSubmit }: Props) => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">今日の体重</h1>
      <input
        type="number"
        step="0.1"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="70.4"
      />
      <button onClick={handleSubmit} className="bg-black text-white p-2 rounded w-full">
        保存
      </button>
    </div>
  );
};

export default WeightInputField;
