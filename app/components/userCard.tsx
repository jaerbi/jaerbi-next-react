interface UserCardProps {
  name: string;
  level: number;
  avatarColor: string;
  onLike: () => void; // Функція-коллбек (аналог @Output)
  isVip?: boolean;
}
export default function UserCard({ name, level, avatarColor, isVip, onLike }: UserCardProps) {
  return (
    <div className={`bg-gray-800 p-6 rounded-xl shadow-xl border ${isVip ? 'border-yellow-500' : 'border-gray-700'} w-80 text-center`}>
      <div className={`w-24 h-24 ${avatarColor} mx-auto rounded-full mb-4 flex items-center justify-center text-4xl text-white`}>
        {name[0]}
      </div>
      
      <h2 className="text-2xl mb-2 text-white">{name}</h2>
      <p className="text-gray-400 mb-4">Рівень досвіду: {level}</p>

      <button 
        onClick={onLike}
        className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition text-white"
      >
        Додати досвід +
      </button>
    </div>
  );
}
