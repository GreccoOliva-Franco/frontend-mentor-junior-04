import { useReducer } from "react";

type Action = 'bill.update'
| 'tip-percentage.update'
| 'tip-percentage.custom'
| 'people.update'
| 'app.reset'

export function useApp() {
  const DECIMALS = 2
  const defaults = {
    billAmount: '',
    hasBillAmountErro: false,
    tipPercentage: '5',
    isCustomTip: false,
    people: '',
    hasPeopleError: false,
  };
  const [state, dispatch] = useReducer(
    (
      prevState, 
      { action, data }: { action: Action, data: unknown }
    ) => {
      switch (action) {
        case 'bill.update': {
          const next = data as string;
          if (next === '' || Number.isFinite(Number(next))) {
            return { ...prevState, billAmount: next, hasBillAmountErro: false }
          }

          return { ...prevState, hasBillAmountErro: true };
        }
        case 'tip-percentage.update': {
          const next = data as string;
          const nextAsNumber = Number(next);

          if (
            (Number.isFinite(nextAsNumber) && nextAsNumber >= 0)
            || next === ''
          ) {
            return { ...prevState, tipPercentage: next }
          }

          return prevState
        }
        case 'tip-percentage.custom': {
          return { ...prevState, isCustomTip: data as boolean }
        }
        case 'people.update': {
          const next = data as string;
          const nextAsNumber = Number(next);

          if (
            (Number.isFinite(nextAsNumber) && nextAsNumber > 0)
            || next === ''
          ) {
            return { ...prevState, people: next, hasPeopleError: false }
          }
          
          return { ...prevState, hasPeopleError: true }
        }
        case 'app.reset': {
          return { ...prevState, defaults }
        }
      }
    },
    defaults
  )
  const { billAmount, tipPercentage, people } = state

  return {
    ...state,
    actions: {
      updateBillAmount: (data: string) => {
        dispatch({ action: 'bill.update', data })
      },
      updateTipPercentage: (data: string) => {
        dispatch({ action: 'tip-percentage.update', data })
      },
      isCustomTip: (state: boolean) => {
        dispatch({ action: 'tip-percentage.custom', data: state })
      },
      updatePeople: (data: string) => {
        dispatch({ action: 'people.update', data })
      },
      reset: () => {
        dispatch({ action: 'app.reset', data: '' }) // data param is useless. set for TS simplicity
      },
    },
    helpers: {
      getTipPerPerson: () => {
        const totalTip = Number(billAmount) * Number(tipPercentage) / 100;
        const perPerson = totalTip / Number(people);
        return Number.isFinite(perPerson)
          ? perPerson.toFixed(2)
          : '...'
      },
      getTotalPerPerson: () => {
        const totalBill = Number(billAmount) * (1 + Number(tipPercentage) / 100);
        const perPerson = totalBill / Number(people);
        return Number.isFinite(perPerson)
          ? perPerson.toFixed(DECIMALS)
          : '...'
      }
    }
  }
}