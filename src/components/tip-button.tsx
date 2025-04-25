import { cn } from "@/lib/utils";

export default function TipButton({
  active,
  text,
  onClick,
}: {
  active: boolean;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "col-span-1 rounded-lg p-2 bg-primary-darker text-white hover:cursor-pointer",
        active && "bg-primary"
      )}
    >
      {text}%
    </button>
  );
}
