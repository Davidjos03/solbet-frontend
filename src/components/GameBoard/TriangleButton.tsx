const TriangleButton = () => {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0">
        {/* Outer Triangle */}
        <div
          className="w-0 h-0 mx-auto rounded-sm"
          style={{
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            borderTop: "26px solid #1a1a1a",
            filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))",
          }}
        ></div>
      </div>
      <div className="absolute top-[2px] left-1 right-1">
        {/* Inner Glow Triangle */}
        <div
          className="w-0 h-0 mx-auto rounded-sm"
          style={{
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "20px solid #5b4bff", // purple-blue
            filter: "drop-shadow(0 0 8px #5b4bff)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TriangleButton;
