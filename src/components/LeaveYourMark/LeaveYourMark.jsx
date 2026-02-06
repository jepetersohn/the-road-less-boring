import { useState, useEffect, useRef } from "react";
import "./LeaveYourMark.css";
const FORM_WIDTH = 260;
const FORM_HEIGHT = 300;
const PADDING = 12;

const FORBIDDEN_WORDS = ["XXX", "SEX"];

export default function LeaveYourMark() {
  const wallRef = useRef(null);
  const previewRef = useRef(null);

  const [marks, setMarks] = useState([]);
  const [preview, setPreview] = useState(null);
  const [formPosition, setFormPosition] = useState(null);

  const [initials, setInitials] = useState("");
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState('"Rock Salt"');
  const [fontSize, setFontSize] = useState(24);
  const [rotation, setRotation] = useState(0);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    fetch("https://www.joanwiththecode.com/api/theroadlessboring/getGraffiti.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMarks(data.marks);
      });
  }, []);

  const sanitizeInitials = (value) =>
    value.replace(/[^A-Z]/gi, "").toUpperCase().slice(0, 3);

  const isForbidden = (value) =>
    FORBIDDEN_WORDS.includes(value.toUpperCase());

  const handleWallClick = (e) => {
    if (hasSubmitted || !wallRef.current) return;

    const rect = wallRef.current.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;
    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    setPreview({
      x: Math.max(3, Math.min(97, x)),
      y: Math.max(6, Math.min(94, y)),
    });
  };

  useEffect(() => {
    if (
      !preview ||
      !wallRef.current ||
      !previewRef.current ||
      isMobile
    ) {
      setFormPosition(null);
      return;
    }

    const wallRect = wallRef.current.getBoundingClientRect();
    const previewRect = previewRef.current.getBoundingClientRect();

    const previewBox = {
      left: previewRect.left - wallRect.left,
      right: previewRect.right - wallRect.left,
      top: previewRect.top - wallRect.top,
      bottom: previewRect.bottom - wallRect.top,
    };

    const candidates = [
      {
        x: previewBox.right + 16,
        y: previewBox.top,
      },
      {
        x: previewBox.left - FORM_WIDTH - 16,
        y: previewBox.top,
      },
      {
        x: previewBox.left,
        y: previewBox.bottom + 16,
      },
      {
        x: previewBox.left,
        y: previewBox.top - FORM_HEIGHT - 16,
      },
    ];

    for (const pos of candidates) {
      const x = Math.max(
        PADDING,
        Math.min(
          wallRect.width - FORM_WIDTH - PADDING,
          pos.x
        )
      );

      const y = Math.max(
        PADDING,
        Math.min(
          wallRect.height - FORM_HEIGHT - PADDING,
          pos.y
        )
      );

      const overlaps =
        x < previewBox.right &&
        x + FORM_WIDTH > previewBox.left &&
        y < previewBox.bottom &&
        y + FORM_HEIGHT > previewBox.top;

      if (!overlaps) {
        setFormPosition({ x, y });
        return;
      }
    }

    setFormPosition({
      x: PADDING,
      y: wallRect.height - FORM_HEIGHT - PADDING,
    });
  }, [preview, initials, font, fontSize, rotation, isMobile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!preview) return;

const cleaned = initials.toUpperCase().trim();

 
  if (!/^[A-Z]{1,3}$/.test(cleaned)) {
    alert("Please use 1-3 letters only.");
    return;
  }

  if (FORBIDDEN_WORDS.includes(cleaned)) {
    alert("That one's not allowed — pick another.");
    return;
  }

    const newMark = {
      initials,
      color,
      font,
      fontSize,
      rotation,
      x: preview.x,
      y: preview.y,
    };

    try {
      const response = await fetch(
        "https://www.joanwiththecode.com/api/theroadlessboring/addGraffiti.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMark),
        }
      );

      const data = await response.json();
      if (data.success) {
        setMarks([...marks, newMark]);
        sessionStorage.setItem("hasLeftMark", "true");
        setHasSubmitted(true);
        handleCancel();
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const resetForm = () => {
    setPreview(null);
    setFormPosition(null);
    setInitials("");
    setColor("#000000");
    setFont('"Rock Salt"');
    setFontSize(24);
    setRotation(0);
  };

  return (
    <div
      ref={wallRef}
      className="graffiti-wall"
      onClick={handleWallClick}
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        background: "#eee",
        border: "2px solid #ccc",
        overflow: "hidden",
        cursor: hasSubmitted ? "default" : "crosshair",
      }}
    >
      {!preview && !hasSubmitted && (
        <div
          style={{
            position: "absolute",
            top: 10,
            width: "100%",
            textAlign: "center",
            fontStyle: "italic",
            color: "#555",
            pointerEvents: "none",
          }}
        >
          Click anywhere in the box to leave your mark
        </div>
      )}

      {marks.map((mark, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${mark.x}%`,
            top: `${mark.y}%`,
            transform: `translate(-50%, -50%) rotate(${mark.rotation}deg)`,
            color: mark.color,
            fontFamily: mark.font,
            fontSize: `${mark.fontSize}px`,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {mark.initials}
        </span>
      ))}

      {preview && (
        <span
          ref={previewRef}
          style={{
            position: "absolute",
            left: `${preview.x}%`,
            top: `${preview.y}%`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            color,
            fontFamily: font,
            fontSize: `${fontSize}px`,
            opacity: 0.6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {initials || "ABC"}
        </span>
      )}

      {preview && !hasSubmitted && (
        <form
        className="graffiti-form"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
          style={{
            position: isMobile ? "fixed" : "absolute",
            left: isMobile ? "50%" : formPosition?.x,
            top: isMobile ? "auto" : formPosition?.y,
            bottom: isMobile ? 12 : "auto",
            transform: isMobile ? "translateX(-50%)" : "none",
            overflowY: "scroll",
            maxHeight: "250px",
            width: isMobile ? "50vw" : FORM_WIDTH,
            background: "rgba(255,255,255,0.95)",
            padding: 10,
            borderRadius: 6,
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          <div className="form-group">
            <label htmlFor="initials">Initials</label>
            <input
              id="initials"
              value={initials}
              placeholder="ABC"
              onChange={(e) =>
                setInitials(sanitizeInitials(e.target.value))
              }
              required
            />
          </div>

         <div className="form-group">
  <label htmlFor="color">Color</label>

  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <input
      id="color"
      type="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
  </div>
</div>


          <div className="form-group">
            <label htmlFor="font">Font</label>
            <select
              id="font"
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              <option value='"Rock Salt"'>Rock Salt</option>
              <option value='"Permanent Marker"'>
                Permanent Marker
              </option>
              <option value='"Finger Paint"'>Finger Paint</option>
              <option value='"Lacquer"'>Lacquer</option>
              <option value='"Sedgwick Ave Display"'>
                Sedgwick Ave Display
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="size">Size</label>
            <input
              id="size"
              type="range"
              min="16"
              max="48"
              value={fontSize}
              onChange={(e) =>
                setFontSize(Number(e.target.value))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="tilt">Tilt</label>
            <input
              id="tilt"
              type="range"
              min="-20"
              max="20"
              value={rotation}
              onChange={(e) =>
                setRotation(Number(e.target.value))
              }
            />
          </div>

          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <button type="submit">Leave mark</button>
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
