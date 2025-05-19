import React from "react";

interface ClippedDivProps {
    mainClass?: string;      // Outer container (size, bg, padding, etc.)
    childClass?: string;     // Inner box (border, text, layout)
    circleClass?: string;    // Corner circles (size, border, color)
    children?: React.ReactNode;
}

const ClippedDiv: React.FC<ClippedDivProps> = ({
    mainClass = "",
    childClass = "",
    circleClass = "w-5 h-5 border-2 border-white", // default size and border
    children,
}) => {
    const circleBase = `absolute rounded-full bg-black ${circleClass}`;

    return (
        <div className={`relative overflow-hidden ${mainClass}`}>
            <div className={`relative w-full h-full ${childClass}`}>
                {children}
            </div>

            {/* Corner circles */}
            <div className={`${circleBase} top-0 left-0 -translate-x-1/2 -translate-y-1/2`} />
            <div className={`${circleBase} top-0 right-0 translate-x-1/2 -translate-y-1/2`} />
            <div className={`${circleBase} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} />
            <div className={`${circleBase} bottom-0 right-0 translate-x-1/2 translate-y-1/2`} />
        </div>
    );
};

export default ClippedDiv;
