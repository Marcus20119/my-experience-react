import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { RemoveStates, SetStates } from '@/shared/types';

import type {
  MultipleFormFirstStepEntity,
  MultipleFormSecondStepEntity,
  MultipleFormThirdStepEntity,
  SingleStepFormEntity,
} from '../model';

enum StepType {
  Multiple = 'multiple',
  Single = 'single',
}

interface FormState {
  currentStep?: number;
  multipleStepFormValue?: {
    firstStep?: MultipleFormFirstStepEntity;
    secondStep?: MultipleFormSecondStepEntity;
    thirdStep?: MultipleFormThirdStepEntity;
  };
  originalFormType?: StepType;
  singleStepFormValue?: SingleStepFormEntity;
}

interface FormAction {
  removeFormStates: RemoveStates<FormState>;
  setFormStates: SetStates<FormState>;
}

export const useFormStore = create<FormAction & FormState>()(
  devtools(
    persist(
      set => ({
        currentStep: 1,
        originalFormType: StepType.Single,
        removeFormStates: keys =>
          set(() => {
            const newState: FormState = {};
            keys.forEach(key => (newState[key] = undefined));
            return newState;
          }),
        setFormStates: param =>
          set(() => {
            const newState: FormState = {};
            Object.keys(param).forEach(key => {
              const k = key as keyof FormState;
              newState[k] = param[k] as undefined;
            });
            return newState;
          }),
      }),
      {
        name: 'store-form',
        partialize: state =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !['currentStep'].includes(key),
            ),
          ),
        storage: createJSONStorage(() => localStorage), // default
      },
    ),
  ),
);
