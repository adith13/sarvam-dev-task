"use client";

import { useState } from 'react';
import { CustomDiv } from "../components/customDiv";

const Slider = ({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    unit = '',
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    unit?: string;
}) => (
    <div className="mb-6 w-full">
        <div className="flex justify-between items-center mb-1">
            <label className="font-medium text-gray-700 text-sm">
                {label}
            </label>
            <span className="px-2 py-1 rounded bg-gray-100 font-mono text-xs">
                {value}{unit}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="rounded-lg w-full h-1.5 bg-gray-200 accent-gray-900 appearance-none cursor-pointer"
        />
    </div>
);

const ColorPicker = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) => (
    <div className="mb-6 w-full">
        <label className="block mb-1 font-medium text-gray-700 text-sm">
            {label}
        </label>
        <div className="flex items-center">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="p-1 border border-gray-300 rounded-md w-10 h-10 cursor-pointer"
            />
            <span className="ml-2 font-mono text-gray-600 text-sm">{value}</span>
        </div>
    </div>
);

export default function Page() {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [size, setSize] = useState(30);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [strokeColor, setStrokeColor] = useState("#000000");

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 font-bold text-gray-900 text-3xl text-center">
                    Custom Div Editor
                </h1>

                <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
                    {/* Controls */}
                    <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                        <h2 className="mb-6 pb-2 border-gray-100 border-b font-semibold text-gray-800 text-lg">
                            Properties
                        </h2>

                        <Slider
                            label="Width"
                            value={width}
                            min={50}
                            max={500}
                            onChange={setWidth}
                            unit="px"
                        />

                        <Slider
                            label="Height"
                            value={height}
                            min={50}
                            max={500}
                            onChange={setHeight}
                            unit="px"
                        />

                        <Slider
                            label="Corner Size"
                            value={size}
                            min={5}
                            max={Math.min(width, height) / 2}
                            onChange={setSize}
                            unit="px"
                        />

                        <Slider
                            label="Stroke Width"
                            value={strokeWidth}
                            min={0}
                            max={10}
                            step={0.5}
                            onChange={setStrokeWidth}
                            unit="px"
                        />

                        <ColorPicker
                            label="Stroke Color"
                            value={strokeColor}
                            onChange={setStrokeColor}
                        />
                    </div>

                    {/* Preview */}
                    <div className="flex flex-col lg:col-span-2">
                        <div className="flex flex-col flex-1 p-6 border border-gray-100 rounded-2xl bg-white shadow">
                            <h2 className="mb-6 pb-2 border-gray-100 border-b font-semibold text-gray-800 text-lg">
                                Preview
                            </h2>
                            <div className="flex flex-1 justify-center items-center p-8 bg-gray-50">
                                <div className="transition-all duration-300 ease-in-out transform">
                                    <CustomDiv
                                        width={width}
                                        height={height}
                                        size={size}
                                        strokeWidth={strokeWidth}
                                        strokeColor={strokeColor}
                                        className={`transition-all duration-300 ease-in-out`}
                                    >
                                        <div className="p-4 text-gray-800 text-center">
                                            <p className="font-medium text-sm">Custom Div</p>
                                            <p className="opacity-70 text-xs">
                                                {width} × {height}px
                                            </p>
                                        </div>
                                    </CustomDiv>
                                </div>
                            </div>
                        </div>

                        {/* Code Snippet */}
                        <div className="mt-6 p-6 rounded-xl overflow-x-auto bg-gray-900 font-mono text-gray-100 text-sm">
                            <pre className="whitespace-pre-wrap">
                                {`<CustomDiv
                                    width={${width}}
                                    height={${height}}
                                    size={${size}}
                                    strokeWidth={${strokeWidth}}
                                    strokeColor="${strokeColor}"
                                    className="bg-amber-300"
                                    />`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
