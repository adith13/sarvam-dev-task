import React, { useId } from "react";

/**
 * Props for the `CustomDiv` component.
 *
 * This component renders a rectangle with a cutout in the top-right corner.
 * The cutout is a square with its top-left corner at the top-right corner of
 * the rectangle, and its size is determined by the `size` prop.
 *
 * The component also renders a `clipPath` element that can be used to clip
 * the contents of the component to the shape of the cutout.
 *
 * @property {ReactNode} [children] - The contents of the component.
 * @property {string} [className] - A CSS class name to apply to the component.
 * @property {number} [height=100] - The height of the rectangle.
 * @property {number} [width=100] - The width of the rectangle.
 * @property {number} [size=10] - The size of the cutout square.
 * @property {string} [strokeColor="black"] - The color of the stroke around the
 *   cutout.
 * @property {number} [strokeWidth=2] - The width of the stroke around the cutout.
 */
export interface CustomDivProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    height?: number;
    width?: number;
    size?: number;
    strokeColor?: string;
    strokeWidth?: number;
}

export const CustomDiv: React.FC<CustomDivProps> = ({
    children,
    className,
    height = 100,
    width = 100,
    size = 10,
    strokeColor = "black",
    strokeWidth = 2,
}) => {
    const id = useId(); // React hook that returns a unique ID
    const clipPathId = `ticketMask-${id}`;

    const pathData = `
        M${width} ${height - size}
        V${size}
        a${size} ${size} 0 0 1 -${size} -${size}
        H${size}
        a${size} ${size} 0 0 1 -${size} ${size}
        V${height - size}
        a${size} ${size} 0 0 1 ${size} ${size}
        H${width - size}
        a${size} ${size} 0 0 1 ${size} -${size}
        Z
    `;

    return (
        <div className="relative">
            <svg
                width={width}
                height={height}
                style={{ position: "absolute" }}
            >
                <defs>
                    <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                        <path
                            d={pathData}
                            transform={`scale(${1 / width}, ${1 / height})`}
                        />
                    </clipPath>
                </defs>
                <path
                    d={pathData}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                />
            </svg>

            <div
                className={className}
                style={{
                    height,
                    width,
                    clipPath: `url(#${clipPathId})`,
                    position: "relative",
                }}
            >
                {children}
            </div>
        </div>
    );
};
