import React, { useEffect, useState, useRef } from "react";
import './App.css';

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const appRefs = useRef([]);

  const connectedApps = [
    { name: "OYO", url: "https://www.oyorooms.com/" },
    { name: "MakeMyTrip", url: "https://www.makemytrip.com/" },
    { name: "Swiggy", url: "https://www.swiggy.com/" },
    { name: "Zomato", url: "https://www.zomato.com/" },
    { name: "BookMyShow", url: "https://in.bookmyshow.com/" },
    { name: "Uber", url: "https://www.uber.com/" },
    { name: "ChatGPT", url: "https://chat.openai.com/" },
    { name: "Netflix", url: "https://www.netflix.com/" }
  ];

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    const handleScroll = () => {
      appRefs.current.forEach((app, index) => {
        const rect = app.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          app.style.opacity = "1";
          app.style.transform = "translateY(0)";
        } else {
          app.style.opacity = "0";
          app.style.transform = "translateY(100px)";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxStyle = (factorX, factorY, isHovered = false) => ({
    transform: `translate(${
      (mousePosition.x - 0.5) * factorX
    }px, ${
      (mousePosition.y - 0.5) * factorY
    }px) ${isHovered ? `translateY(-10px)` : ''}`,
    transition: "transform 0.1s ease-out",
  });

  return (
    <div className="app-container">
      <div className="background-image"></div>
      <header className="site-header">
        <h1 className="site-name" style={parallaxStyle(70, 70)}>
          <span className="web-text">WEB</span>Hopper
        </h1>
      </header>
      <main className="main-content">
        <section className="connected-apps">
          <h2>All Your Most Loved Platforms at One Place</h2>
          <div className="app-grid">
            {connectedApps.map((app, index) => (
              <a
                key={index}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="app-link"
                ref={(el) => (appRefs.current[index] = el)}
              >
                {app.name}
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 <span className="copyright-logo">©</span> | Made by Dikshant</p>
          <div className="social-media-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
