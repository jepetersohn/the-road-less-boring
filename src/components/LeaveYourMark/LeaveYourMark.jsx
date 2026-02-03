import React, { useState, useEffect } from "react";
import "./LeaveYourMark.css";

export default function LeaveYourMark() {
  const [marks, setMarks] = useState([]); 
  const [preview, setPreview] = useState(null); 

  const [initials, setInitials] = useState(""); 
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);
  const [isBold, setIsBold] = useState(false);
  const [rotation, setRotation] = useState(0); 

  const [dragging, setDragging] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const submitted = sessionStorage.getItem("hasLeftMark") === "true";
    setHasSubmitted(submitted);
  }, []);

  const handleWallClick = (e) => {
    if (hasSubmitted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPreview({ x, y });
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setDragging(true);
  };
  const handleMouseMove = (e) => {
    if (!dragging || !preview) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    x = Math.min(Math.max(x, 0), 100);
    y = Math.min(Math.max(y, 0), 100);
    setPreview({ ...preview, x, y });
  };
  const handleMouseUp = () => setDragging(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!preview) return;

    const newMark = {
      initials,
      color,
      font,
      fontSize,
      isBold,
      x: preview.x,
      y: preview.y,
      rotation,
    };

    setMarks([...marks, newMark]);

    sessionStorage.setItem("hasLeftMark", "true");
    setHasSubmitted(true);

    setPreview(null);
    setInitials("");
    setColor("#000000");
    setFont("Arial");
    setFontSize(24);
    setIsBold(false);
    setRotation(0);
  };

  const tiltOptions = [-15, -10, -5, 0, 5, 10, 15];

  return (
    <>
      <div
        className="graffiti-wall"
        onClick={handleWallClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          background: "#eee",
          border: "2px solid #ccc",
          cursor: hasSubmitted ? "not-allowed" : "crosshair",
        }}
      >

        {!hasSubmitted && marks.length === 0 && !preview && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              width: "100%",
              textAlign: "center",
              color: "#555",
              fontStyle: "italic",
              pointerEvents: "none",
              fontSize: "14px",
            }}
          >
            Click anywhere in the box to leave your mark
          </div>
        )}

        {marks.map((mark, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: `${mark.x}%`,
              top: `${mark.y}%`,
              color: mark.color,
              fontFamily: mark.font,
              fontSize: `${mark.fontSize}px`,
              fontWeight: mark.isBold ? "bold" : "normal",
              transform: `translate(-50%, -50%) rotate(${mark.rotation}deg)`,
              pointerEvents: "none",
            }}
          >
            {mark.initials}
          </div>
        ))}

        {preview && !hasSubmitted && (
          <>
            <div
              onMouseDown={handleMouseDown}
              style={{
                position: "absolute",
                left: `${preview.x}%`,
                top: `${preview.y}%`,
                color,
                fontFamily: font,
                fontSize: `${fontSize}px`,
                fontWeight: isBold ? "bold" : "normal",
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                cursor: "move",
                zIndex: 500,
              }}
            >
              {initials || "XX"}
            </div>

            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              style={{
                position: "absolute",
                top: `${preview.y + 5}%`,
                left: `${preview.x}%`,
                transform: "translate(-50%, 0)",
                background: "rgba(255,255,255,0.9)",
                padding: "8px",
                borderRadius: "4px",
                zIndex: 1000,
              }}
            >
              <input
                type="text"
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase())}
                placeholder="Your initials"
                maxLength={3}
                required
              />


              <div style={{ display: "flex", gap: "0.25em", marginTop: "0.25em" }}>
                {["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"].map(
                  (c) => (
                    <div
                      key={c}
                      onClick={() => setColor(c)}
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: c,
                        border: c === color ? "3px solid #555" : "1px solid #aaa",
                        cursor: "pointer",
                      }}
                    />
                  )
                )}
              </div>

              <div style={{ display: "flex", gap: "0.25em", marginTop: "0.25em" }}>
                {["Arial", "Courier New", "Brush Script MT"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFont(f)}
                    style={{
                      fontFamily: f,
                      fontWeight: font === f ? "bold" : "normal",
                      cursor: "pointer",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.25em", marginTop: "0.25em" }}>
                {[16, 24, 32, 48].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFontSize(size)}
                    style={{
                      fontWeight: fontSize === size ? "bold" : "normal",
                      cursor: "pointer",
                    }}
                  >
                    {size}px
                  </button>
                ))}
              </div>

              <label style={{ display: "block", marginTop: "0.25em" }}>
                <input
                  type="checkbox"
                  checked={isBold}
                  onChange={() => setIsBold(!isBold)}
                />{" "}
                Bold
              </label>

              <div style={{ display: "flex", gap: "0.25em", marginTop: "0.25em" }}>
                {tiltOptions.map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setRotation(angle)}
                    style={{
                      fontWeight: rotation === angle ? "bold" : "normal",
                      cursor: "pointer",
                    }}
                  >
                    {angle}°
                  </button>
                ))}
              </div>

              <button type="submit" style={{ marginTop: "0.25em" }}>
                Submit
              </button>
            </form>
          </>
        )}

        {hasSubmitted && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              width: "100%",
              textAlign: "center",
              color: "#999",
              fontStyle: "italic",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            You have already left your mark this session.
          </div>
        )}
      </div>
    </>
  );
}
