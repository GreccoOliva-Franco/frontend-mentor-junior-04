"use client";

import Input from "@/components/input";
import TipButton from "@/components/tip-button";
import { useApp } from "@/hooks/app";
import { cn } from "@/lib/utils";

export default function Home() {
  const {
    billAmount,
    tipPercentage,
    isCustomTip,
    people,
    hasPeopleError,
    actions,
    helpers,
  } = useApp();

  return (
    <div className="flex flex-col h-screen items-center bg-background/40">
      <img src={"/logo.svg"} alt="Splitter logo" className="m-12" />
      <div className="flex flex-col w-full h-full gap-8 px-6 py-8 rounded-t-2xl bg-surface">
        {/* Settings */}
        <div className="flex flex-col gap-8">
          {/* Bill Amount */}
          <Input
            id="bill-amount"
            label="Bill"
            value={billAmount}
            onChange={(e) => actions.updateBillAmount(e.target.value)}
            onFocusCapture={() => actions.updateBillAmount("")}
            error={false}
            icon={{
              src: "/icon-dollar.svg",
              alt: "Dollar icon",
              className: "h-5 w-3",
            }}
            placeholder={0}
          />

          {/* Tip Selection */}
          <div className="flex flex-col w-full gap-1">
            <h2>Select Tip %</h2>
            <div className="grid grid-cols-2 gap-2">
              {["5", "10", "15", "25", "50"].map((item) => (
                <TipButton
                  key={item}
                  text={item}
                  onClick={() => {
                    actions.isCustomTip(false);
                    actions.updateTipPercentage(item);
                  }}
                  active={!isCustomTip && tipPercentage === item}
                />
              ))}
              <input
                type="text"
                value={isCustomTip ? tipPercentage : "Custom"}
                onChange={(e) => actions.updateTipPercentage(e.target.value)}
                onFocusCapture={() => {
                  actions.isCustomTip(true);
                  actions.updateTipPercentage("");
                }}
                className="pr-4 rounded-lg text-primary-darker/60 text-end text-xl font-bold bg-input-background"
              />
            </div>
          </div>

          {/* Bill Subdivision */}
          <Input
            id="number-of-people"
            label="Number of People"
            icon={{
              src: "/icon-person.svg",
              alt: "Number of people",
              className: "size-3",
            }}
            value={people}
            error={hasPeopleError}
            errorMessage="Can't be zero"
            onChange={(e) => actions.updatePeople(e.target.value)}
            onFocusCapture={() => actions.updatePeople("1")}
            placeholder={0}
          />

          {/* Display */}
          <div className="flex flex-col flex-grow justify-between gap-8 p-4 rounded-xl bg-primary-darker text-white">
            <div className="flex flex-col flex-grow gap-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold">Tip Amount</h2>
                  <h3 className="text-primary-text-dimmed font-semibold">
                    / person
                  </h3>
                </div>

                <div className="flex justify-end items-center gap-1">
                  <img
                    src={"/icon-dollar.svg"}
                    alt="Dollar icon"
                    className="text-primary"
                  />
                  <h2 className="text-xl text-primary">
                    {helpers.getTipPerPerson()}
                  </h2>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold">Total</h2>
                  <h3 className="text-primary-text-dimmed font-semibold">
                    / person
                  </h3>
                </div>

                <div className="flex justify-end items-center gap-1">
                  <img
                    src={"/icon-dollar.svg"}
                    alt="Dollar icon"
                    className="text-primary"
                  />
                  <h2 className="text-xl text-primary">
                    {helpers.getTotalPerPerson()}
                  </h2>
                </div>
              </div>
            </div>
            <button
              onClick={() => actions.reset()}
              className={cn(
                "p-2 rounded-lg bg-primary-accent",
                "hover:cursor-pointer hover:bg-background/40",
                "text-primary-accent-text uppercase"
              )}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
