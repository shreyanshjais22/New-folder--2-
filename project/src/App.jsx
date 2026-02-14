import React, { useState, useEffect, useRef } from 'react';

export default function ValentineWebsite() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showYesMessage, setShowYesMessage] = useState(false);
  const [showNoModal, setShowNoModal] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [confetti, setConfetti] = useState([]);
  const audioRef = useRef(null);

  // Background music - autoplay on launch and start from 5 seconds
  useEffect(() => {
    // Music file should be in public/music/love.mp3
    const audio = new Audio('/music/love.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.currentTime = 5; // Start from 5 seconds
    audioRef.current = audio;

    // Try to autoplay immediately
    const attemptAutoplay = async () => {
      try {
        await audio.play();
      } catch (error) {
        // If autoplay is blocked, play on first user interaction
        const playOnInteraction = async () => {
          try {
            await audio.play();
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
          } catch (err) {
            console.log('Audio playback failed');
          }
        };

        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      }
    };

    attemptAutoplay();

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  // Confetti generator
  const launchConfetti = () => {
    const pieces = [];
    for (let i = 0; i < 80; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: ['#ff6b9d', '#ffd700', '#ff69b4', '#ff1493', '#ffb6c1'][Math.floor(Math.random() * 5)],
      });
    }
    setConfetti(pieces);

    setTimeout(() => setConfetti([]), 5000);
  };

  useEffect(() => {
    createHearts();
  }, []);

  const createHearts = () => {
    const hearts = [];
    for (let i = 0; i < 15; i++) {
      hearts.push(i);
    }
    return hearts;
  };

  const createSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 30; i++) {
      sparkles.push(i);
    }
    return sparkles;
  };

  const createPetals = () => {
    const petals = [];
    for (let i = 0; i < 20; i++) {
      petals.push(i);
    }
    return petals;
  };

  const createArrows = () => {
    const arrows = [];
    for (let i = 0; i < 5; i++) {
      arrows.push(i);
    }
    return arrows;
  };

  const createBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < 10; i++) {
      bubbles.push(i);
    }
    return bubbles;
  };

  const handleYesClick = () => {
    launchConfetti();
    setShowYesMessage(true);
    setTimeout(() => {
      setCurrentPage(2);
      setShowYesMessage(false);
      window.scrollTo(0, 0);
    }, 1000);
  };

  const handleNoClick = () => {
    setShowNoModal(true);
  };

  const handleNoHover = () => {
    // Move the button randomly when hovered
    setNoPosition({
      top: Math.random() * 300 - 150,
      left: Math.random() * 300 - 150,
    });
  };

  const handleContinue = () => {
    setCurrentPage(3);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #fff5f7 0%, #ffe6ee 50%, #ffd6e0 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@300;400&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Cormorant Garamond', serif;
          overflow-x: hidden;
        }

        /* Animated gradient background */
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Floating hearts */
        .hearts-bg {
          position: fixed;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .heart {
          position: absolute;
          width: 20px;
          height: 20px;
          background: #ff6b9d;
          transform: rotate(45deg);
          animation: float 15s infinite;
        }

        .heart:before,
        .heart:after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: #ff6b9d;
          border-radius: 50%;
        }

        .heart:before {
          left: -10px;
        }

        .heart:after {
          top: -10px;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(45deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(50vh) rotate(45deg) translateX(100px);
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) rotate(45deg) translateX(-50px);
            opacity: 0;
          }
        }

        /* Sparkles */
        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          box-shadow: 0 0 10px #ffd700;
          animation: sparkle 3s infinite;
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Rose petals */
        .petal {
          position: absolute;
          width: 15px;
          height: 15px;
          background: #ffb6c1;
          border-radius: 50% 0 50% 0;
          opacity: 0.7;
          animation: petalFall 12s infinite;
        }

        @keyframes petalFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Floating cupid arrows */
        .arrow {
          position: absolute;
          width: 40px;
          height: 2px;
          background: #ff69b4;
          animation: arrowFloat 20s infinite linear;
        }

        .arrow::before {
          content: '';
          position: absolute;
          right: -8px;
          top: -4px;
          width: 0;
          height: 0;
          border-left: 10px solid #ff69b4;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }

        .arrow::after {
          content: '';
          position: absolute;
          left: -5px;
          top: -2px;
          width: 0;
          height: 0;
          border-right: 8px solid #ff1493;
          border-top: 3px solid transparent;
          border-bottom: 3px solid transparent;
        }

        @keyframes arrowFloat {
          0% {
            transform: translateX(-100px) rotate(-45deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) rotate(-45deg);
            opacity: 0;
          }
        }

        /* Love bubbles */
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255, 192, 203, 0.4), rgba(255, 105, 180, 0.2));
          border: 2px solid rgba(255, 182, 193, 0.3);
          animation: bubbleFloat 15s infinite;
        }

        @keyframes bubbleFloat {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(50vh) scale(1);
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }

        /* Confetti */
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          top: -20px;
          z-index: 9999;
          animation: confettiFall 5s linear forwards;
          pointer-events: none;
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 1s forwards;
          position: relative;
          z-index: 1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .proposal-container {
          text-align: center;
          max-width: 600px;
          width: 100%;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .proposal-container h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          color: #c94277;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(201, 66, 119, 0.3);
          animation: heartbeat 2s ease-in-out infinite;
          line-height: 1.2;
          white-space: nowrap;
          text-align: center;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .question {
          font-size: clamp(1.2rem, 3.5vw, 2rem);
          color: #c94277;
          margin-bottom: 2.5rem;
          font-weight: 400;
          line-height: 1.4;
        }

        .yes-message {
          font-size: clamp(1.1rem, 2.8vw, 1.8rem);
          color: #c94277;
          margin-top: 1.5rem;
          font-weight: 400;
          animation: fadeInScale 0.5s ease-out forwards;
          line-height: 1.4;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .btn {
          padding: 1.2rem 2.5rem;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(201, 66, 119, 0.3);
          min-width: 140px;
        }

        .btn-yes {
          background: linear-gradient(135deg, #ff6b9d, #c94277);
          color: white;
        }

        .btn-yes:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 40px rgba(201, 66, 119, 0.3);
        }

        .btn-no {
          background: white;
          color: #c94277;
          border: 3px solid #ff6b9d;
          position: relative;
          transition: all 0.3s ease;
        }

        .btn-no:hover {
          background: #fff5f7;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          text-align: center;
          max-width: 450px;
          width: 90%;
          margin: 2rem;
          box-shadow: 0 20px 60px rgba(201, 66, 119, 0.3);
          animation: popIn 0.3s ease-out;
        }

        @keyframes popIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .modal-content h3 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 2rem);
          color: #c94277;
          margin-bottom: 1.2rem;
        }

        .modal-content p {
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          color: #333;
          margin-bottom: 1.8rem;
        }

        .letter-container {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .letter {
          background: white;
          padding: clamp(2rem, 5vw, 4rem);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(201, 66, 119, 0.3);
          border: 1px solid #ff6b9d;
          position: relative;
        }

        .letter:before {
          content: '❤️';
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(2rem, 5vw, 3rem);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        .letter h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          color: #c94277;
          margin-bottom: 2rem;
          text-align: center;
          line-height: 1.3;
        }

        .letter-content {
          font-size: clamp(1.1rem, 2.2vw, 1.3rem);
          line-height: 1.8;
          color: #333;
          margin-bottom: 2rem;
        }

        .letter-content p {
          margin-bottom: 1.5rem;
        }

        .signature {
          text-align: right;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          color: #c94277;
          font-style: italic;
          margin-top: 2rem;
        }

        .continue-btn {
          display: block;
          margin: 2rem auto 0;
          padding: 1rem 2.2rem;
          background: linear-gradient(135deg, #ff6b9d, #c94277);
          color: white;
          border: none;
          border-radius: 50px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.2vw, 1.3rem);
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(201, 66, 119, 0.3);
          transition: all 0.3s ease;
        }

        .continue-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(201, 66, 119, 0.3);
        }

        .gallery-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .gallery-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: #c94277;
          text-align: center;
          margin-bottom: 2.5rem;
          text-shadow: 2px 2px 4px rgba(201, 66, 119, 0.3);
          line-height: 1.3;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .photo-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(201, 66, 119, 0.3);
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .photo-card:nth-child(1) { animation-delay: 0.1s; }
        .photo-card:nth-child(2) { animation-delay: 0.2s; }
        .photo-card:nth-child(3) { animation-delay: 0.3s; }
        .photo-card:nth-child(4) { animation-delay: 0.4s; }
        .photo-card:nth-child(5) { animation-delay: 0.5s; }
        .photo-card:nth-child(6) { animation-delay: 0.6s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .photo-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 50px rgba(201, 66, 119, 0.3);
        }

        .photo-placeholder {
          width: 100%;
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #fff5f7, #ffe6ee);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          position: relative;
          overflow: hidden;
        }

        .photo-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photo-placeholder:before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 107, 157, 0.05) 10px,
            rgba(255, 107, 157, 0.05) 20px
          );
          animation: slide 20s linear infinite;
        }

        @keyframes slide {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .photo-caption {
          padding: 1.2rem;
          text-align: center;
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #c94277;
        }

        .final-message {
          text-align: center;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 3vw, 2rem);
          color: #c94277;
          margin-top: 2.5rem;
          padding: 1.8rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(201, 66, 119, 0.3);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .letter {
            padding: 1.5rem;
          }
          
          .photo-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          
          .buttons {
            gap: 1rem;
          }
          
          .btn {
            padding: 1rem 2rem;
            min-width: 120px;
          }
          
          .modal-content {
            margin: 1rem;
            padding: 2rem;
          }
          
          .proposal-container h1 {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 480px) {
          .proposal-container h1 {
            font-size: 1.8rem;
          }
          
          .question {
            font-size: 1.1rem;
          }
          
          .letter {
            padding: 1.2rem;
          }
          
          .letter h2 {
            font-size: 1.8rem;
          }
          
          .letter-content {
            font-size: 1rem;
            line-height: 1.6;
          }
        }

        @media (max-width: 380px) {
          .proposal-container h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            background: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}

      {/* Floating hearts background */}
      <div className="hearts-bg">
        {/* Hearts */}
        {createHearts().map((i) => (
          <div
            key={`heart-${i}`}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
        
        {/* Sparkles */}
        {createSparkles().map((i) => (
          <div
            key={`sparkle-${i}`}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
        
        {/* Rose Petals */}
        {createPetals().map((i) => (
          <div
            key={`petal-${i}`}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${Math.random() * 8 + 10}s`,
            }}
          />
        ))}
        
        {/* Cupid Arrows */}
        {createArrows().map((i) => (
          <div
            key={`arrow-${i}`}
            className="arrow"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
        
        {/* Love Bubbles */}
        {createBubbles().map((i) => (
          <div
            key={`bubble-${i}`}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 40}px`,
              height: `${Math.random() * 60 + 40}px`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 10 + 12}s`,
            }}
          />
        ))}
      </div>

      {/* Page 1: Proposal */}
      {currentPage === 1 && (
        <div className="page">
          <div className="proposal-container">
            <h1>❤️ Valentine's Day ❤️</h1>
            <p className="question">Avni, Will You Be My Valentine?</p>
            <div className="buttons">
              <button className="btn btn-yes" onClick={handleYesClick}>
                Yes! 💕
              </button>
              <button
                className="btn btn-no"
                onMouseEnter={handleNoHover}
                onClick={handleNoClick}
                style={{
                  transform: `translate(${noPosition.left}px, ${noPosition.top}px)`,
                }}
              >
                No
              </button>
            </div>
            {showYesMessage && (
              <p className="yes-message">I know tum yes par click karoge! 😊💕</p>
            )}
          </div>
        </div>
      )}

      {/* Modal for "No" button */}
      {showNoModal && (
        <div className="modal" onClick={() => setShowNoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Arre! 😊</h3>
            <p>Yes par click karo! 💝</p>
            <button className="continue-btn" onClick={() => setShowNoModal(false)}>
              Okay! ❤️
            </button>
          </div>
        </div>
      )}

      {/* Page 2: Letter */}
      {currentPage === 2 && (
        <div className="page">
          <div className="letter-container">
            <div className="letter">
              <h2>My Dearest Avni</h2>
              <div className="letter-content">
                <p>
                  From the moment I met you, my world truly became brighter. You might be
                  thinking why I'm putting so much effort into this… pagal hoon kya? 😅
                  Honestly, it's nothing like that. Bas mera mann tha ki tere liye kuch
                  special karu, isliye kar raha hoon.
                </p>

                <p>
                  When we first started talking, I never imagined our conversations would
                  last this long. Mujhe laga tha bas thodi si baat hogi aur khatam ho
                  jayegi. But now, I find myself wanting to talk to you the whole day.
                  Agar ek din bhi properly baat na ho, toh kuch missing sa lagta hai.
                </p>

                <p>
                  I don't even know when it happened… maybe you became important to me,
                  maybe I started falling for you. Jo bhi hai, bas itna jaanta hoon ki
                  I never want to lose you. You've become a part of my everyday happiness,
                  and your smile, your words, even your little habits mean more to me than
                  you probably realize.
                </p>

                <p>
                  Thank you for being you — kind, beautiful inside and out, and so special
                  in your own way. I'm truly grateful you came into my life… and even more
                  grateful that you said yes.🥰
                </p>
              </div>
              <div className="signature">With all my love ❤️</div>
              <button className="continue-btn" onClick={handleContinue}>
                See Our Memories 📸
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page 3: Photo Gallery */}
      {currentPage === 3 && (
        <div className="page">
          <div className="gallery-container">
            <h2 className="gallery-title">Our Beautiful Memories Together 💕</h2>
            <div className="photo-grid">
              {[
                { src: '/images/pic1.jpeg', emoji: '📷', caption: 'Our First Date' },
                { src: '/images/pic5.jpg', emoji: '💝', caption: 'Love & Laughter' },
                { src: '/images/pic4.jpeg', emoji: '🌟', caption: 'Making Memories' },
                { src: '/images/pic3.jpg', emoji: '💑', caption: 'Making Angry' },
                { src: '/images/pic2.jpg', emoji: '🌹', caption: 'That Special Moment' },
                { src: '/images/pic6.jpg', emoji: '✨', caption: 'You & Me 💖' },
              ].map((photo, index) => (
                <div key={index} className="photo-card">
                  <div className="photo-placeholder">
                    <img 
                      src={photo.src} 
                      alt={photo.caption}
                      onError={(e) => {
              
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = photo.emoji;
                      }}
                    />
                  </div>
                  <div className="photo-caption">{photo.caption}</div>
                </div>
              ))}
            </div>
            <div className="final-message">
              Happy Valentine's Day, Avni! 💕
              <br />
              Here's to many more beautiful memories together! 🥰
            </div>
          </div>
        </div>
      )}
    </div>
  );
}