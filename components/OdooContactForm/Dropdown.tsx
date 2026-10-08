"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface IDropdownOption {
  label: string;
  value: string;
}

interface IDropdownProps {
  id: string;
  options: Array<IDropdownOption>;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  darkTheme?: boolean;
  hasError?: boolean;
  // When a floating label sits over the trigger, it plays the placeholder's role.
  showPlaceholder?: boolean;
}

const Dropdown = ({
  id,
  options,
  value,
  onChange,
  ariaLabel,
  darkTheme,
  hasError,
  showPlaceholder = true,
}: IDropdownProps) => {
  // The config arrays carry the placeholder as the option with an empty value.
  const placeholder =
    options.find((option) => option.value === "")?.label ?? "Select";
  const items = options.filter((option) => option.value !== "");

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

  const selectedIndex = items.findIndex((item) => item.value === value);
  const selectedLabel =
    selectedIndex > -1
      ? items[selectedIndex].label
      : showPlaceholder
      ? placeholder
      : "";

  const close = useCallback((refocus?: boolean) => {
    setIsOpen(false);
    setActiveIndex(-1);
    if (refocus) {
      triggerRef.current?.focus();
    }
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    setActiveIndex(selectedIndex > -1 ? selectedIndex : 0);
  }, [selectedIndex]);

  const canClear = selectedIndex > -1;

  const clearSelection = useCallback(() => {
    onChange("");
    close(true);
  }, [onChange, close]);

  const commit = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        onChange(item.value);
      }
      close(true);
    },
    [items, onChange, close]
  );

  // Close when focus or a click lands outside the whole control.
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [isOpen, close]);

  // Keep the highlighted option in view while arrowing through a scrolled list.
  useEffect(() => {
    if (isOpen && activeIndex > -1) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, activeIndex]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          open();
        } else {
          setActiveIndex((current) => (current + 1) % items.length);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          open();
        } else {
          setActiveIndex(
            (current) => (current - 1 + items.length) % items.length
          );
        }
        break;
      case "Home":
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(items.length - 1);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (isOpen) {
          commit(activeIndex);
        } else {
          open();
        }
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          close(true);
        }
        break;
      case "Tab":
        if (isOpen) {
          close();
        }
        break;
      case "Backspace":
      case "Delete":
        // Clear the choice the way a native select lets you return to the placeholder.
        if (canClear) {
          event.preventDefault();
          onChange("");
          close();
        }
        break;
      default:
        break;
    }
  };

  const borderColour = hasError
    ? "border-red-500"
    : darkTheme
    ? "border-[#D1D6D7]"
    : "border-[#272727]";

  const focusStyles = darkTheme
    ? "focus-visible:border-white focus-visible:bg-white/[0.05]"
    : "focus-visible:border-[#161211] focus-visible:bg-black/[0.04]";

  const valueColour =
    selectedIndex > -1
      ? darkTheme
        ? "text-[#e6eced]"
        : "text-[#272727]"
      : "text-[#8A8E8F]";

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        aria-label={ariaLabel}
        aria-activedescendant={
          isOpen && activeIndex > -1 ? `${id}-option-${activeIndex}` : undefined
        }
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleKeyDown}
        className={`${borderColour} ${valueColour} w-full block text-left bg-transparent border-b md:border md:rounded-[5px] px-0 py-3 md:p-3 min-[1561px]:p-4 pr-8 md:pr-10 text-xl md:text-lg min-[1561px]:text-2xl focus:outline-none ${focusStyles} transition-colors duration-150 font-['HelveticaNeueSmallBold']`}
      >
        <span className="block truncate">{selectedLabel}&nbsp;</span>
      </button>

      {/* Chevron sits over the trigger and passes clicks straight through to it. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-0 md:pr-3 min-[1561px]:pr-4">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`shrink-0 w-4 h-4 md:w-5 md:h-5 transition-all duration-200 ${
            isOpen ? "rotate-180" : ""
          } ${
            hasError
              ? "text-red-500"
              : isOpen
              ? darkTheme
                ? "text-[#E6ECED]"
                : "text-[#272727]"
              : "text-[#8A8E8F]"
          }`}
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[12px] border shadow-2xl ${
            darkTheme
              ? "border-[#3a3f40] bg-[#161211]"
              : "border-[#D1D6D7] bg-white"
          }`}
        >
          <ul
            id={`${id}-listbox`}
            role="listbox"
            aria-label={ariaLabel}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className="dropdown-panel max-h-[240px] overflow-y-auto py-2"
          >
            {items.map((item, index) => {
              const isSelected = item.value === value;
              const isActive = index === activeIndex;
              return (
                <li
                  key={item.value}
                  id={`${id}-option-${index}`}
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => commit(index)}
                  className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-lg min-[1561px]:text-xl transition-colors duration-100 font-['HelveticaNeueSmallBold'] ${
                    isActive
                      ? darkTheme
                        ? "bg-white/[0.07]"
                        : "bg-black/[0.05]"
                      : ""
                  } ${
                    isSelected
                      ? darkTheme
                        ? "text-white"
                        : "text-[#161211]"
                      : darkTheme
                      ? "text-[#E6ECED]"
                      : "text-[#272727]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="w-4 h-4 shrink-0"
                    >
                      <path
                        d="M4 10.5 8 14.5 16 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>

          {canClear && (
            <button
              type="button"
              onClick={clearSelection}
              className={`w-full border-t px-4 py-3 text-left text-[13px] md:text-sm transition-colors duration-150 font-['libre-franklin'] ${
                darkTheme
                  ? "border-white/10 text-[#8A8E8F] hover:bg-white/[0.07] hover:text-[#E6ECED]"
                  : "border-black/10 text-[#8A8E8F] hover:bg-black/[0.05] hover:text-[#272727]"
              }`}
            >
              Clear selection
            </button>
          )}
        </div>
      )}

      <style jsx>
        {`
          .dropdown-panel {
            scrollbar-width: thin;
            scrollbar-color: #5c6364 transparent;
          }

          .dropdown-panel::-webkit-scrollbar {
            width: 6px;
          }

          .dropdown-panel::-webkit-scrollbar-track {
            background: transparent;
          }

          .dropdown-panel::-webkit-scrollbar-thumb {
            background: #5c6364;
            border-radius: 999px;
          }
        `}
      </style>
    </div>
  );
};

export default Dropdown;
