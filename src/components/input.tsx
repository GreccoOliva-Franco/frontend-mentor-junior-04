import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export default function Input({
  id,
  label = "",
  icon,
  value,
  placeholder,
  onChange,
  onFocus,
  error,
  errorMessage = "",
}: React.HTMLAttributes<"input"> & {
  label: string;
  icon?: { src: string; alt: string; className: ClassValue };
  value: string;
  error: boolean;
  errorMessage?: string;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 hover:cursor-pointer">
      <div className="flex justify-between">
        <span className="block">{label}</span>
        {error && <span className="block text-red-500">{errorMessage}</span>}
      </div>
      <div
        className={cn(
          "flex justify-between items-center p-2 rounded-md bg-input-background",
          "focus:boder focus:border-primary",
          error && "border-2 border-red-500"
        )}
      >
        {icon && (
          <img src={icon.src} alt={icon.alt} className={icon.className} />
        )}
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="flex-auto pr-2 text-xl text-end text-input-text font-bold"
          placeholder={placeholder}
        />
      </div>
    </label>
  );
}
