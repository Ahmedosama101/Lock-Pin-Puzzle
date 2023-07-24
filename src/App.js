// Import necessary libraries and assets
import React, { useState, useEffect } from "react";
import "./App.css";
import Confetti from "react-confetti";
import celebrationSound from "./celebration-sound1.mp3"; 

// Define locked and unlocked lock icons as SVG components
const lockedIcon = (
   // SVG path for the locked lock
  <svg
    width="150"
    height="150"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* SVG path for the locked lock */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
      fill="currentColor"
    />
  </svg>
);

const unlockedIcon = (
   // SVG path for the unlocked lock
   <svg
    width="150"
    height="150"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* SVG path for the unlocked lock */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 7H17C17 4.79086 15.2091 3 13 3C10.7909 3 9 4.79086 9 7V10H18C19.6569 10 21 11.3431 21 13V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V13C3 11.3431 4.34315 10 6 10H7V7C7 3.68629 9.68629 1 13 1C16.3137 1 19 3.68629 19 7ZM18 12H6C5.44772 12 5 12.4477 5 13V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V13C19 12.4477 18.5523 12 18 12Z"
      fill="currentColor"
    />
  </svg>
);

const App = () => {
    // State variables to manage pin input, clues, lock status, and celebration
  const [pin, setPin] = useState(["", "", ""]);
  const [clue, setClue] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [shakeLock, setShakeLock] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [audio] = useState(new Audio(celebrationSound));
  
    // Puzzle data with clues and answers
  const puzzles = [
    {
      clues: [
        "Clue 1: Code 291: One digit is right and is in its place.",
        "Clue 2: Code 245: One digit is right and is in the wrong place.",
        "Clue 3: Code 463: Two digits are right but both are in the wrong place.",
        "Clue 4: Code 578: No digit is correct.",
        "Clue 5: Code 569: One digit right but is in the wrong place.",
      ],
      answer: ["3", "9", "4"],
    },
    {
      clues: [
        "Clue 1: Code 147: One digit is right and is in its place.",
        "Clue 2: Code 189: One digit is right and is in the wrong place.",
        "Clue 3: Code 965: Two digits are right but both are in the wrong place.",
        "Clue 4: Code 523: No digit is correct.",
        "Clue 5: Code 286: One digit right but is in the wrong place.",
      ],
      answer: ["6", "7", "9"],
    },
    {
      clues: [
        "Clue 1: Code 682: One digit is right and is in its place.",
        "Clue 2: Code 614: One digit is right and is in the wrong place.",
        "Clue 3: Code 206: Two digits are right but both are in the wrong place.",
        "Clue 4: Code 738: No digit is correct.",
        "Clue 5: Code 380: One digit right but is in the wrong place.",
      ],
      answer: ["0", "4", "2"],
    }, 
    {
      clues: [
        "Clue 1: Code 142: One digit is right and is in its place.",
        "Clue 2: Code 309: Two digits are right but both are in the wrong place.",
        "Clue 3: Code 456: No digit is correct.",
        "Clue 4: Code 139: One digit right but is in the wrong place.",
      ],
      answer: ["3", "0", "2"],
    },

  ];

    // Function to handle changes in pin input
  const handleInputChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
  };

    // Function to handle form submission (checking the entered pin)
  const handleSubmit = () => {
    const userPin = pin.join("");
    if (userPin === puzzles[puzzleIndex].answer.join("")) {
      setClue("Congratulations! The lock is unlocked.");
      setIsUnlocked(true);
      setShowCelebration(true);
      setShakeLock(false);
      setConfettiActive(true); 
    } else {
      setClue(getClue(userPin));
      setIsUnlocked(false);
      setShowCelebration(false);
      setShakeLock(true); 
      setConfettiActive(false); 
    }
  };

  // Function to handle moving to the next puzzle
  const handleNextPuzzle = () => {
    setPuzzleIndex((prevIndex) => (prevIndex + 1) % puzzles.length);
    setPin(["", "", ""]);
    setIsUnlocked(false);
    setClue("");
    setShowCelebration(false);
    setShakeLock(false); 
    setConfettiActive(false); 
  };
  
  // Effect to handle animation timers for celebration and shaking
  useEffect(() => {
    if (showCelebration) {
      const celebrationTimer = setTimeout(() => {
        setShowCelebration(false);
        setConfettiActive(false); 
      }, 4000);

      return () => clearTimeout(celebrationTimer);
    }

    if (shakeLock) {
      const shakeTimer = setTimeout(() => {
        setShakeLock(false);
      }, 500);

      return () => clearTimeout(shakeTimer);
    }
  }, [showCelebration, shakeLock]);

    // Effect to handle playing and stopping the celebration sound effect
  useEffect(() => {
    // Play the audio when confettiActive is set to true
    if (confettiActive) {
      audio.play().catch((err) => console.error("Failed to play audio:", err));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [confettiActive]);

  const getClue = (userPin) => {
    // Compare userPin with the correctPin and generate the appropriate clue
    // You can use the provided clues to create a logic for this
    // For simplicity, I'll just return a default clue for now
    return "Try again. The lock remains locked.";
  };
    // Render the Puzzle App UI

  return (
    <div className="App" style={{ backgroundColor: "#A2CDB0" }}>
       <h1 className="title">Puzzzles</h1>
      <div className={`lock ${isUnlocked ? "unlocked" : ""} ${shakeLock ? "shake" : ""}`}>
        {isUnlocked ? unlockedIcon : lockedIcon}
      </div>

      {confettiActive && <Confetti className="confetti" recycle={false} numberOfPieces={200} />}

      <div className="input-boxes">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="number"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            max="9"
            min="0"
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div className="clues">
        {puzzles[puzzleIndex].clues.map((clue, index) => (
          <p key={index}>{clue}</p>
        ))}
      </div>
      <button onClick={handleNextPuzzle}>Next Puzzle</button>
      <div className={`clue ${showCelebration ? "celebrate" : ""}`}>{clue}</div>
    </div>
  );
};

// Export the App component as the default export
export default App;