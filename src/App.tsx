import Game from './components/Game';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        <Game />
      </div>
    </div>
  );
}