import "./Logo.css";
import { useState, useEffect } from "react";

const Logo = ({ isLoading, onVanishComplete }) => {
  const [introFinished, setIntroFinished] = useState(false);
  const [isPermanentlyGone, setIsPermanentlyGone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroFinished(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const shouldVanish = !isLoading && introFinished;

  useEffect(() => {
    if (shouldVanish) {
      const cleanupTimer = setTimeout(() => {
        setIsPermanentlyGone(true);
        if (onVanishComplete) onVanishComplete();
      }, 1500);
      return () => clearTimeout(cleanupTimer);
    }
  }, [shouldVanish, onVanishComplete]);

  if (isPermanentlyGone) return null;

  const d = 4;

  const x11 = d * 11;
  const x9 = d * 9;
  const x7 = d * 7;
  const x5 = d * 5;
  const x3 = d * 3;
  const x1 = d * 1;

  const y5 = d * 5;
  const y3 = d * 3;
  const y1 = d;

  return (
    <div className={`loading-overlay ${shouldVanish ? "fade-out" : ""}`}>
      <svg
        viewBox="-50 -50 100 100"
        className="logo-svg"
        width="100vw"
        height="100vw"
      >
        <g className="logo-geometry" strokeWidth="0.2" fill="none">
          <line
            id="u1"
            x1={-x11}
            y1={y5 + d / 3}
            x2={-x11}
            y2={y3 - d / 2}
            stroke="var(--secondary-text)"
            className="draw-line"
          />
          <line
            id="d1"
            x1={x11}
            y1={y3 - d / 3}
            x2={x11}
            y2={y5 + d / 2}
            stroke="var(--secondary-text)"
            className="draw-line"
          />

          <line
            id="r2"
            x1={-x9 - d / 2}
            y1={-y5}
            x2={x7 + d / 2}
            y2={-y5}
            stroke="var(--secondary-text)"
            className="draw-line"
          />
          <line
            id="l2"
            x1={x11 + d / 2}
            y1={y5}
            x2={-x11 - d / 2}
            y2={y5}
            stroke="var(--secondary-text)"
            className="draw-line"
          />

          <line
            id="d3"
            x1={-x9}
            y1={-y5 - d / 3}
            x2={-x9}
            y2={-y3 + d / 2}
            stroke="var(--secondary-text)"
            className="draw-line"
          />
          <line
            id="u3"
            x1={x7}
            y1={y3 + d / 3}
            x2={x7}
            y2={-y5 - d / 2}
            stroke="var(--secondary-text)"
            className="draw-line"
          />

          <line
            id="l4"
            x1={x3 + d / 3}
            y1={-y3}
            x2={-x9 - d / 2}
            y2={-y3}
            stroke="var(--secondary-text)"
            className="draw-line"
          />
          <line
            id="r4"
            x1={-x11 - d / 2}
            y1={y3}
            x2={x11 + d / 2}
            y2={y3}
            stroke="var(--secondary-text)"
            className="draw-line"
          />

          <line
            id="u5"
            x1={-x5}
            y1={y3 + d / 4}
            x2={-x5}
            y2={-y3 - d / 2}
            stroke="var(--secondary-text)"
            className="draw-line"
          />
          <line
            id="d5"
            x1={x5}
            y1={-y5 - d / 2}
            x2={x5}
            y2={y5 + d / 2}
            stroke="var(--secondary-text)"
            className="draw-line"
          />

          <line
            id="r6"
            x1={-x1 - d / 2}
            y1={-y1}
            x2={x1 + d / 3}
            y2={-y1}
            stroke="var(--secondary-text)"
            className="draw-line"
          />
          <line
            id="l6"
            x1={x3 + d / 4}
            y1={y1}
            x2={-x1 - d / 3}
            y2={y1}
            stroke="var(--secondary-text)"
            className="draw-line"
          />

          <line
            id="d7"
            x1={-x3}
            y1={-y3 - d / 4}
            x2={-x3}
            y2={y3 + d / 3}
            stroke="var(--secondary-text)"
            className="draw-line"
          />
          <line
            id="u7"
            x1={x3}
            y1={y5 + d / 2}
            x2={x3}
            y2={-y3 - d / 3}
            stroke="var(--secondary-text)"
            className="draw-line"
          />

          <line
            id="u8"
            x1={-x1}
            y1={y1 + d / 4}
            x2={-x1}
            y2={-y1 - d / 3}
            stroke="var(--secondary-text)"
            className="draw-line"
          />
          <line
            id="d8"
            x1={x1}
            y1={-y5 - d / 3}
            x2={x1}
            y2={-y1 + d / 2}
            stroke="var(--secondary-text)"
            className="draw-line"
          />

          <g className="strokes-group">
            <line
              id="s1"
              x1={-x9}
              y1={-y5 + d}
              x2={x1}
              y2={-y5 + d}
              strokeWidth={2 * d}
              stroke="var(--secondary-text)"
              className="draw-stroke"
            />
            <line
              id="s2"
              x1={-x5 + d}
              y1={-y3}
              x2={-x5 + d}
              y2={y3}
              strokeWidth={2 * d}
              stroke="var(--secondary-text)"
              className="draw-stroke"
            />
            <line
              id="s3"
              x1={-x11}
              y1={y3 + d}
              x2={x3}
              y2={y3 + d}
              strokeWidth={2 * d}
              stroke="var(--secondary-text)"
              className="draw-stroke"
            />
            <path
              id="s5"
              d={`M ${x5 + d} ${-y5} V ${y5 - d} H ${x11}`}
              stroke="var(--secondary-text)"
              strokeWidth={2 * d}
              className="draw-stroke"
            />
            <path
              id="s4"
              d={`M ${x1 + d} ${-y3} V ${y1 - d} H ${-x1}`}
              stroke="var(--secondary-text)"
              strokeWidth={2 * d}
              className="draw-stroke heart-light"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
