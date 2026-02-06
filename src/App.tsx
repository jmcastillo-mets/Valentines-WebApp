import "./App.css";
import {useState} from "react";

function App() {
    const [noPosition, setNoPosition] = useState({x: 0, y: 0});
    const [yesClicked, setYesClicked] = useState(false);
    const [noClickCount, setNoClickCount] = useState(0);

    const messages = [
        "Are you sure?",
        "Really sure?",
        "Think about it...",
        "Last chance!",
        "I'm very sad now :(",
        "You're breaking my heart!",
    ];

    const handleNoHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        const randomX = (Math.random() - 0.5) * 300;
        const randomY = (Math.random() - 0.5) * 200;
        setNoPosition({x: randomX, y: randomY});
    };

    const handleNoClick = () => {
        setNoClickCount((prev) => (prev + 1) % messages.length);
        const randomX = (Math.random() - 0.5) * 400;
        const randomY = (Math.random() - 0.5) * 300;
        setNoPosition({x: randomX, y: randomY});
    };

    const handleYes = () => {
        setYesClicked(true);
    };

    if (yesClicked) {
        return (
            <div className="container success">
                <div className="success-content">
                    <h1>🎉 YES! 🎉</h1>
                    <p>I knew you were a person of excellent taste!</p>
                    <p className="heart-sequence">❤️ 💕 💖 💝 💗 ❤️</p>
                    <p className="date-message">Can't wait to see you soon!</p>
                    <p className="emoji-party">🥂✨🌹🎊💫</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="content">
                <div className="hearts-bg">
                    {[...Array(10)].map((_, i) => (
                        <span
                            key={i}
                            className="heart"
                        >
                            ❤️
                        </span>
                    ))}
                </div>

                <h1 className="title">So... 💭</h1>
                <p className="subtitle">
                    I'm not great at science, but I'm pretty sure chemistry is
                    when two people become one, and I'd like to test that theory
                    with you.
                </p>

                <div className="question">Will you go on a date with me?</div>

                <div className="button-container">
                    <button
                        className="btn btn-yes"
                        onClick={handleYes}
                    >
                        Yes! 😍
                    </button>
                    <button
                        className="btn btn-no"
                        onMouseEnter={handleNoHover}
                        onClick={handleNoClick}
                        style={{
                            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                        }}
                    >
                        {messages[noClickCount]}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
