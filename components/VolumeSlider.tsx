"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
    className="relative flex flex-column justify-center select-none touch-none h-[80px] w-[2px] mx-auto"
    defaultValue={[.5]}
    value={[value]}
    max={1}
    step={.1}
    orientation="vertical"
    onValueChange={handleChange}

  >
    <RadixSlider.Track className="relative bg-neutral-600 grow rounded-full w-[1px]">
      <RadixSlider.Range className="absolute bg-white rounded-full w-full" />
    </RadixSlider.Track>
    <RadixSlider.Thumb
      className="block w-3 h-3 bg-white  rounded-[10px] hover:bg-violet3 focus:outline-none"
      aria-label="Volume"
    />
  </RadixSlider.Root>
  );
};

export default Slider;
