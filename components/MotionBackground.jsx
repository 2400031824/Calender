export default function MotionBackground({ monthIndex }) {
    // 0 = Jan, 1 = Feb, 2 = Mar...
    let elements = [];
    let bgGradient = "linear-gradient(to bottom, #aec9e6, #e6f0fa)";

    const baseAnim = "fallDown 8s linear infinite";

    switch (monthIndex) {
        case 0: // Jan - New Year
            bgGradient = "linear-gradient(to bottom, #2b1f47, #130b29)";
            elements = [
                <div key="1" className="absolute top-[10%] left-[20%] text-4xl fly-up animation-delay-200">🚀</div>,
                <div key="2" className="absolute top-[30%] left-[70%] text-5xl fade-pulse animation-delay-500">🎆</div>,
                <div key="3" className="absolute top-[50%] left-[40%] text-6xl fade-pulse">🎇</div>
            ];
            break;
        case 1: // Feb - Disney/Mickey
            bgGradient = "linear-gradient(to bottom, #ffdde1, #ee9ca7)";
            elements = [
                <div key="1" className="absolute top-10 left-[20%] text-4xl spin-slow">🐭</div>,
                <div key="2" className="absolute top-20 left-[70%] text-3xl float-side animation-delay-500">🎀</div>,
                <div key="3" className="absolute bottom-10 left-[45%] text-6xl fade-pulse">🏰</div>,
                <div key="4" className="absolute top-10 left-[50%] text-lg fall-slow">💖</div>
            ];
            break;
        case 2: // Mar - Harry Potter
            bgGradient = "linear-gradient(to bottom, #112233, #334455)";
            elements = [
                <div key="1" className="absolute top-10 left-[30%] text-5xl wobbly">🦉</div>,
                <div key="2" className="absolute top-30 left-[70%] text-4xl float-side animation-delay-300">⚡</div>,
                <div key="3" className="absolute bottom-20 left-[15%] text-3xl float-up animation-delay-700">🪄</div>,
                <div key="4" className="absolute top-0 left-[80%] text-xl fall-slow">✉️</div>
            ];
            break;
        case 3: // Apr - Anime / Naruto
            bgGradient = "linear-gradient(to bottom, #ffafbd, #ffc3a0)";
            elements = [
                <div key="1" className="absolute top-20 left-[25%] text-5xl dash-across">☁️</div>,
                <div key="2" className="absolute top-40 left-[60%] text-4xl spin-fast">🍥</div>,
                <div key="3" className="absolute bottom-10 left-[80%] text-6xl bounce animation-delay-400">🐸</div>,
                <div key="4" className="absolute top-10 left-[10%] text-5xl fade-pulse">🍜</div>
            ];
            break;
        case 4: // May - Minions / Cartoons
            bgGradient = "linear-gradient(to bottom, #fceabb, #f8b500)";
            elements = [
                <div key="1" className="absolute top-10 left-[50%] text-5xl float-side">🍌</div>,
                <div key="2" className="absolute top-30 left-[20%] text-4xl wobbly animation-delay-200">🧽</div>,
                <div key="3" className="absolute top-50 left-[70%] text-5xl bounce animation-delay-500">🐌</div>
            ];
            break;
        case 5: // Jun - Pokemon
            bgGradient = "linear-gradient(to bottom, #56ab2f, #a8e063)";
            elements = [
                <div key="1" className="absolute top-20 left-[30%] text-4xl fall-slow">🔴</div>,
                <div key="2" className="absolute bottom-20 left-[60%] text-6xl float-up animation-delay-300">⚡</div>,
                <div key="3" className="absolute top-10 left-[80%] text-4xl fall-slow animation-delay-700">🐢</div>
            ];
            break;
        case 6: // Jul - Marvel
            bgGradient = "linear-gradient(to bottom, #2C3E50, #E74C3C)";
            elements = [
                <div key="1" className="absolute top-10 left-[20%] text-5xl dash-across">🕷️</div>,
                <div key="2" className="absolute top-[40%] left-[60%] text-6xl spin-slow animation-delay-500">🛡️</div>,
                <div key="3" className="absolute bottom-10 left-[30%] text-5xl bounce">💥</div>
            ];
            break;
        case 7: // Aug - Independence Day
            bgGradient = "linear-gradient(to bottom, #ff9933, #ffffff, #138808)";
            elements = [
                <div key="1" className="absolute top-10 left-[30%] text-4xl float-side">🕊️</div>,
                <div key="2" className="absolute top-30 left-[70%] text-5xl spin-slow animation-delay-400">☸️</div>,
                <div key="3" className="absolute bottom-20 left-[50%] text-4xl float-up">🇮🇳</div>
            ];
            break;
        case 8: // Sep - Space / Sci-fi
            bgGradient = "linear-gradient(to bottom, #000000, #434343)";
            elements = [
                <div key="1" className="absolute top-20 left-[20%] text-6xl float-up">🚀</div>,
                <div key="2" className="absolute top-[40%] left-[80%] text-5xl dash-across animation-delay-500">🛸</div>,
                <div key="3" className="absolute bottom-10 left-[10%] text-4xl spin-slow">🪐</div>
            ];
            break;
        case 9: // Oct - Halloween
            bgGradient = "linear-gradient(to bottom, #3E5151, #DECBA4)";
            elements = [
                <div key="1" className="absolute top-10 left-[10%] text-5xl float-side">🦇</div>,
                <div key="2" className="absolute bottom-10 left-[50%] text-6xl float-up animation-delay-300">🎃</div>,
                <div key="3" className="absolute top-[40%] left-[80%] text-5xl wobbly animation-delay-700">👻</div>
            ];
            break;
        case 10: // Nov - Funny No holiday
            bgGradient = "linear-gradient(to bottom, #E0EAFC, #CFDEF3)";
            elements = [
                <div key="1" className="absolute top-[20%] left-[10%] text-sm font-bold text-gray-500 rotate-[-15deg] float-side">Oops no holidays...</div>,
                <div key="2" className="absolute top-[40%] left-[60%] text-xs font-bold text-gray-500 rotate-[10deg] float-side animation-delay-500">Don't skip school!</div>,
                <div key="3" className="absolute top-[60%] left-[30%] text-md font-bold text-gray-500 rotate-[-5deg] float-side animation-delay-800">Make an excuse.</div>,
                <div key="4" className="absolute top-10 left-[80%] text-4xl bounce text-gray-400">📝</div>
            ];
            break;
        case 11: // Dec - Winter / Christmas
            bgGradient = "linear-gradient(to bottom, #0575E6, #021B79)";
            elements = [
                <div key="1" className="absolute top-10 left-[20%] text-white text-lg fall-slow">❄️</div>,
                <div key="2" className="absolute top-20 left-[50%] text-white text-md fall-slow animation-delay-500">❄️</div>,
                <div key="3" className="absolute top-0 left-[80%] text-white text-xl fall-slow animation-delay-300">❄️</div>,
                <div key="4" className="absolute bottom-10 left-[30%] text-6xl wobbly">⛄</div>,
                <div key="5" className="absolute bottom-5 left-[70%] text-5xl float-up animation-delay-700">🎅</div>
            ];
            break;
        default:
            break;
    }

    return (
        <div className="absolute inset-0 overflow-hidden" style={{ background: bgGradient }}>
            <style>{`
               @keyframes fallDown {
                   0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
                   10% { opacity: 1; }
                   100% { transform: translateY(400px) translateX(20px) rotate(360deg); opacity: 0; }
               }
               @keyframes floatSide {
                   0% { transform: translateX(0px); }
                   50% { transform: translateX(30px); }
                   100% { transform: translateX(0px); }
               }
               @keyframes floatUp {
                   0% { transform: translateY(50px) scale(0.8); opacity: 0; }
                   50% { opacity: 1; }
                   100% { transform: translateY(-200px) scale(1.2); opacity: 0; }
               }
               @keyframes spinSlow {
                   from { transform: rotate(0deg); }
                   to { transform: rotate(360deg); }
               }
               @keyframes spinFast {
                   from { transform: rotate(0deg); }
                   to { transform: rotate(360deg); }
               }
               @keyframes fadePulse {
                   0%, 100% { opacity: 0.2; transform: scale(0.8); }
                   50% { opacity: 1; transform: scale(1.2); }
               }
               @keyframes wobbly {
                   0%, 100% { transform: rotate(-10deg); }
                   50% { transform: rotate(10deg); }
               }
               @keyframes dashAcross {
                   0% { transform: translateX(-100px); opacity: 0; }
                   20% { opacity: 1; }
                   100% { transform: translateX(400px); opacity: 0; }
               }
               @keyframes bounceAnim {
                   0%, 100% { transform: translateY(0); }
                   50% { transform: translateY(-30px); }
               }

               .fall-slow { animation: fallDown 6s linear infinite; }
               .float-side { animation: floatSide 4s ease-in-out infinite; }
               .float-up { animation: floatUp 5s linear infinite; }
               .spin-slow { animation: spinSlow 10s linear infinite; }
               .spin-fast { animation: spinFast 3s linear infinite; }
               .fade-pulse { animation: fadePulse 3s ease-in-out infinite; }
               .wobbly { animation: wobbly 2s ease-in-out infinite; }
               .dash-across { animation: dashAcross 6s linear infinite; }
               .bounce { animation: bounceAnim 2s ease-in-out infinite; }

               .animation-delay-200 { animation-delay: 0.5s; }
               .animation-delay-300 { animation-delay: 1.2s; }
               .animation-delay-400 { animation-delay: 1.8s; }
               .animation-delay-500 { animation-delay: 2.5s; }
               .animation-delay-700 { animation-delay: 3.5s; }
               .animation-delay-800 { animation-delay: 4.2s; }
            `}</style>
            {elements}
        </div>
    );
}
