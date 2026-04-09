export default function MotionBackground({ monthIndex }) {
    // 0 = Jan, 1 = Feb, 11 = Dec -> Winter
    // 2, 3, 4 -> Spring
    // 5, 6, 7 -> Summer
    // 8, 9, 10 -> Autumn
    let season = "";
    if (monthIndex === 11 || monthIndex === 0 || monthIndex === 1) season = "winter";
    else if (monthIndex >= 2 && monthIndex <= 4) season = "spring";
    else if (monthIndex >= 5 && monthIndex <= 7) season = "summer";
    else season = "autumn";

    let elements = [];
    if (season === "winter") {
        elements = [
            <div key="snow1" className="absolute top-10 left-[20%] text-white text-lg winter-fall animation-delay-100 opacity-60">❄️</div>,
            <div key="snow2" className="absolute top-0 left-[50%] text-white text-md winter-fall animation-delay-500 opacity-80">❄️</div>,
            <div key="snow3" className="absolute top-16 left-[80%] text-white text-xl winter-fall animation-delay-200 opacity-70">❄️</div>,
            <div key="snow4" className="absolute top-5 left-[30%] text-white text-sm winter-fall animation-delay-800 opacity-50">❄️</div>,
            <div key="snowman" className="absolute bottom-5 left-5 text-4xl">⛄</div>
        ]
    } else if (season === "spring") {
        elements = [
            <div key="sp1" className="absolute top-0 left-[25%] text-pink-300 text-lg spring-fall animation-delay-100 opacity-80">🌸</div>,
            <div key="sp2" className="absolute top-0 left-[45%] text-pink-300 text-sm spring-fall animation-delay-400 opacity-70">🌸</div>,
            <div key="sp3" className="absolute top-0 left-[75%] text-pink-300 text-md spring-fall animation-delay-200 opacity-90">🌸</div>,
            <div key="sp4" className="absolute top-0 left-[15%] text-pink-300 text-xl spring-fall animation-delay-700 opacity-60">🍃</div>
        ]
    } else if (season === "summer") {
        elements = [
            <div key="su1" className="absolute top-4 left-[20%] text-yellow-100 text-5xl cloud-float opacity-90">☁️</div>,
            <div key="su2" className="absolute top-10 left-[60%] text-yellow-100 text-6xl cloud-float animation-delay-500 opacity-80">☁️</div>,
            <div key="su3" className="absolute -top-10 -right-10 text-yellow-400 text-8xl sun-spin">☀️</div>
        ]
    } else if (season === "autumn") {
        elements = [
            <div key="au1" className="absolute top-0 left-[20%] text-orange-400 text-lg fall-leaves animation-delay-100">🍁</div>,
            <div key="au2" className="absolute top-0 left-[50%] text-red-400 text-xl fall-leaves animation-delay-300">🍂</div>,
            <div key="au3" className="absolute top-0 left-[80%] text-orange-300 text-md fall-leaves animation-delay-500">🍁</div>,
            <div key="au4" className="absolute top-0 left-[35%] text-red-300 text-lg fall-leaves animation-delay-700">🍂</div>
        ]
    }

    const seasonGradients = {
        winter: "linear-gradient(to bottom, #aec9e6, #e6f0fa)",
        spring: "linear-gradient(to bottom, #dcedc1, #a8e6cf)",
        summer: "linear-gradient(to bottom, #87CEEB, #FFF8DC)",
        autumn: "linear-gradient(to bottom, #ffdcb3, #ffb380)"
    };

    return (
        <div className="absolute inset-0 overflow-hidden" style={{ background: seasonGradients[season] }}>
            <style>{`
               @keyframes fallDown {
                   0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
                   10% { opacity: 1; }
                   100% { transform: translateY(400px) translateX(20px) rotate(360deg); opacity: 0; }
               }
               @keyframes cloudFloat {
                   0% { transform: translateX(-50px); opacity: 0.8; }
                   50% { transform: translateX(50px); opacity: 1; }
                   100% { transform: translateX(-50px); opacity: 0.8; }
               }
               @keyframes sunSpin {
                   from { transform: rotate(0deg); }
                   to { transform: rotate(360deg); }
               }
               .winter-fall { animation: fallDown 4s linear infinite; }
               .spring-fall { animation: fallDown 5s linear infinite; }
               .fall-leaves { animation: fallDown 6s linear infinite; }
               .cloud-float { animation: cloudFloat 20s ease-in-out infinite; }
               .sun-spin { animation: sunSpin 60s linear infinite; }
               .animation-delay-100 { animation-delay: 0.5s; }
               .animation-delay-200 { animation-delay: 1.2s; }
               .animation-delay-300 { animation-delay: 1.8s; }
               .animation-delay-400 { animation-delay: 2.4s; }
               .animation-delay-500 { animation-delay: 3s; }
               .animation-delay-700 { animation-delay: 4.5s; }
               .animation-delay-800 { animation-delay: 5s; }
            `}</style>
            {elements}
        </div>
    );
}
