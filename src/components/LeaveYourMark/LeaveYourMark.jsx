import React, { useState } from "react";
import "./LeaveYourMark.css";

export default function LeaveYourMark() {
  // State for the ritual
  const [isOpen, setIsOpen] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  // Current input state
  const [initials, setInitials] = useState("");
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);
  const [isBold, setIsBold] = useState(false);

  // Wall marks
  const [marks, setMarks] = useState([]);

  // Input handlers
  const handleInitialsChange = (e) => setInitials(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSigned(true);
     /* try {
            const response = await fetch("https://www.joanwiththecode.com/api/theroadlessboring/addComment.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                initials: initials
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            setInitials("");

        } else {
            console.error("Failed to add initials:", data.error);
        }
    } catch (err) {
        console.error("Network error:", err);
    }*/
  };

  // Wall click handler
  const handleWallClick = (e) => {
    if (!hasSigned) return; // only allow placement after form submission
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newMark = {
      initials,
      color,
      font,
      fontSize,
      isBold,
      x,
      y,
    };

    setMarks([...marks, newMark]);

    // Reset form state if you want the user to leave another mark
    setInitials("");
    setColor("#000000");
    setFont("Arial");
    setFontSize(24);
    setIsBold(false);
    setHasSigned(false);
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && <button onClick={() => setIsOpen(true)}>Leave Your Mark</button>}

      {isOpen && !hasSigned && (
        <>
          {/* Live Preview */}
          <div
            style={{
              color,
              fontFamily: font,
              fontSize: `${fontSize}px`,
              fontWeight: isBold ? "bold" : "normal",
              marginBottom: "1em",
            }}
          >
            {initials || "JD"}
          </div>

          {/* Form */}
          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="initials">Your Initials</label>
              <textarea
                id="initials"
                value={initials}
                onChange={handleInitialsChange}
                required
                maxLength="3"
              />
            </div>

            {/* Color Picker */}
            <div className="form-group">
              <label>Color:</label>
              <div style={{ display: "flex", gap: "0.5em", marginTop: "0.25em" }}>
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
            </div>

            {/* Font Picker */}
            <div className="form-group">
              <label>Font:</label>
              <div style={{ display: "flex", gap: "0.5em", marginTop: "0.25em" }}>
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
            </div>

            {/* Font Size Picker */}
            <div className="form-group">
              <label>Font Size:</label>
              <div style={{ display: "flex", gap: "0.5em", marginTop: "0.25em" }}>
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
            </div>

            {/* Bold Toggle */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={isBold}
                  onChange={() => setIsBold(!isBold)}
                />{" "}
                Bold
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </>
      )}

      {/* Graffiti Wall */}
      <div
        className="graffiti-wall"
        onClick={handleWallClick}
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          background: "#eee",
          marginTop: "1em",
          border: "2px solid #ccc",
          cursor: hasSigned ? "crosshair" : "default",
        }}
      >
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
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            {mark.initials}
          </div>
        ))}
      </div>

      {isOpen && hasSigned && (
        <div className="signed" style={{ marginTop: "1em" }}>
          Click on the wall to place your mark!
        </div>
      )}
    </>
  );
}


