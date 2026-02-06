import "./App.css";
import {useState} from "react";

function App() {
    const [noPosition, setNoPosition] = useState({x: 0, y: 0});
    const [yesClicked, setYesClicked] = useState(false);
    const [envelopeOpened, setEnvelopeOpened] = useState(false);
    const [showInvitation, setShowInvitation] = useState(false);
    const [noClickCount, setNoClickCount] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showSadMessage, setShowSadMessage] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [userMessage, setUserMessage] = useState("");

    const messages = [
        "Friendly Date?",
        "Are you sure?",
        "Really sure?",
        "Think about it...",
        "Last chance!",
        "I'm very sad now :(",
        "Please say yes...",
        "I promise it'll be fun!",
        "I'll bring flowers 🌹",
        "Let's go see the beach?",
        "Road trip? 🚗",
        "I'll treat you to dinner 🍽️",
        "We can watch your favorite movie 🎬",
        "I'll make it a day to remember! 💖",
    ];

    // Tenor embed ids (from links you provided)
    const tenorIds = [
        "20739728",
        "10103206880427503134",
        "1418144503451126279",
        "7707780315143387184",
        "1975526499861417359",
        "15528176692501895710",
        "2157306352389636545",
        "15528176692501895710",
        "5276199764143986284",
        "214438556722653764",
        "4231717927828306245",
        "2049020038486032791",
        "17429986855464100052",
    ];

    const handleNoClick = () => {
        const vw = window.innerWidth || 0;
        const isSmall = vw <= 420; // match CSS breakpoint

        if (!isSmall) {
            if (!hasInteracted) setHasInteracted(true);
            // randomize position on click for larger screens
            const maxX = window.innerWidth - 150;
            const maxY = window.innerHeight - 60;
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            setNoPosition({x: randomX, y: randomY});
        }

        // Show sad message permanently and advance to next message in list
        setShowSadMessage(true);
        const next = (noClickCount + 1) % messages.length;
        setNoClickCount(next);
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
                {/* Floating confetti background */}
                <div className="confetti-container">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${2 + Math.random() * 1}s`,
                            }}
                        >
                            {
                                ["🎉", "💖", "🎊", "✨", "🌹", "💝"][
                                    Math.floor(Math.random() * 6)
                                ]
                            }
                        </div>
                    ))}
                </div>

                <div className="success-content">
                    <h1 className="success-title">🎉 YES! 🎉</h1>
                    <p className="success-subtitle">
                        You just made me the happiest person!
                    </p>
                    <p className="heart-sequence">❤️ 💕 💖 💝 💗 ❤️</p>
                    <p className="date-message">
                        I can't wait to spend an{" "}
                        <span className="highlight">amazing day</span> with you!
                        <br />
                        Let's pick a date and make it{" "}
                        <span className="highlight">unforgettable</span>! 🌹
                    </p>
                    <div className="note-section">
                        <p className="note-label">✨ A little reminder:</p>
                        <p className="note-text">
                            Weekends are best so we can take our time. Let's
                            make sure your parents are happy too! 💕
                        </p>
                    </div>
                    <button
                        className="date-picker-btn"
                        onClick={() => setShowDateModal(true)}
                    >
                        📅 Pick a Date
                    </button>
                    {showDateModal && (
                        <div
                            className="modal-overlay"
                            onClick={() => setShowDateModal(false)}
                        >
                            <div
                                className="date-modal"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="modal-title">
                                    Choose a Date 💕
                                </h2>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                    className="date-input"
                                    min={new Date().toISOString().split("T")[0]}
                                />

                                {/* --- New Message Field --- */}
                                <textarea
                                    placeholder="Leave a note... (suggest a place or a favorite snack!) ✍️"
                                    value={userMessage}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>,
                                    ) => setUserMessage(e.target.value)}
                                    className="message-input"
                                    rows={3}
                                />
                                <div className="modal-buttons">
                                    <button
                                        type="button"
                                        className="modal-btn cancel-btn"
                                        onClick={() => setShowDateModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="modal-btn confirm-btn"
                                        disabled={!selectedDate}
                                        onClick={() => {
                                            // Log or handle the data
                                            console.log({
                                                date: selectedDate,
                                                message: userMessage,
                                            });
                                            setShowDateModal(false);
                                            setYesClicked(true); // Or your final success logic
                                        }}
                                    >
                                        Confirm Date
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <p className="love-message">
                        This is just the beginning of something beautiful... 💕
                    </p>
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
                {showSadMessage && (
                    <div className="sad-message">
                        <div className="sad-gif">
                            <iframe
                                src={`https://tenor.com/embed/${tenorIds[noClickCount % tenorIds.length]}`}
                                title="sad-gif"
                                frameBorder="0"
                                scrolling="no"
                                allowTransparency={true}
                            />
                        </div>
                        <p className="sad-text">{messages[noClickCount]}</p>
                    </div>
                )}
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
                        className={`btn btn-no ${hasInteracted ? "floating" : ""}`}
                        onClick={handleNoClick}
                        style={
                            hasInteracted
                                ? {
                                      left: `${noPosition.x}px`,
                                      top: `${noPosition.y}px`,
                                  }
                                : {}
                        }
                    >
                        No 🥺
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
