import "./App.css";
import {useState} from "react";

function App() {
    const [noPosition, setNoPosition] = useState({x: 0, y: 0});
    const [yesClicked, setYesClicked] = useState(false);
    const [envelopeOpened, setEnvelopeOpened] = useState(false);
    const [showInvitation, setShowInvitation] = useState(false);
    const [noClickCount, setNoClickCount] = useState(0);
    const [noClickTotal, setNoClickTotal] = useState(0);
    const [showPlease, setShowPlease] = useState(false);

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
        setNoClickTotal((prev) => {
            const t = prev + 1;
            if (t >= messages.length) setShowPlease(true);
            return t;
        });
        const randomX = (Math.random() - 0.5) * 400;
        const randomY = (Math.random() - 0.5) * 300;
        setNoPosition({x: randomX, y: randomY});
    };

    const handleYes = () => {
        setYesClicked(true);
    };

    const handleEnvelopeClick = () => {
        setEnvelopeOpened(true);
        setTimeout(() => setShowInvitation(true), 700);
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

    if (!showInvitation) {
        return (
            <div className="container">
                <div className="envelope-wrapper">
                    <div
                        className={`envelope ${envelopeOpened ? "open" : ""}`}
                        onClick={handleEnvelopeClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            // allow Enter or Space to open
                            if (
                                (e as React.KeyboardEvent<HTMLDivElement>)
                                    .key === "Enter" ||
                                (e as React.KeyboardEvent<HTMLDivElement>)
                                    .key === " "
                            ) {
                                handleEnvelopeClick();
                            }
                        }}
                        aria-label="Open invitation"
                    >
                        <div className="flap" />
                        <div
                            className="seal"
                            aria-hidden
                        >
                            <span>❤</span>
                        </div>
                        <div className="body">
                            <div className="letter"></div>
                        </div>
                    </div>
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
                    I don’t know if you already have plans for Valentine’s Day,
                    but I’d really love to take you out—if you’d let me.
                </p>

                <div className="question">
                    So... will you go on a date with me?
                </div>

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
                        {showPlease ? "Please?" : messages[noClickCount]}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
