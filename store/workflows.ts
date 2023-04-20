import {defineStore} from 'pinia'
import {Flow, Input, Item, Step, Topic} from "~/studio/schema";
import {SanityDocument, SanityReference} from "@sanity/client";
import _ from "lodash";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useWorkflowsStore = defineStore('workflows', {
  state: () => ({
    steps: new Map() as Map<Step['_id'], Step>,
    items: [] as Item[],
    flows: [] as Flow[],
    inputs: [] as Input[],
    topics: [] as Topic[],
    active: null,
    selectedItem: null as Item | null,
    showModal: false,
    currentFlow: null as null | Flow,
    flow: null,
    prevSteps: [] as Step[],
    nextSteps: [] as Step[],
    status: 'onboarding' as 'onboarding' | 'started' | 'final',
    currentStepIndex: 0,
    editableFields: new Map<string, string>(),
  }),
  getters: {
    canMoveOn: ({currentStep, ...s}) => {
      const value = currentStep.type !== 'choose' ?
        true :
        !currentStep.items?.length || !!s.selectedItem

      return value

    },
    currentStep: (s): Step | undefined => {

      if (typeof s.nextSteps === 'undefined') return false;

      const id = s.currentFlow?.steps[s.currentStepIndex]?._ref

      const curr = s.nextSteps[0]

      return {
        ...curr,
        items: curr.items?.map(i => s.getItem(i)) || []
      }

    },
    hasItems: (s): boolean => s?.currentStep?.items?.length,
    isLastStep(s): boolean {
      return s?.currentFlow?.steps?.length <= (s.currentStepIndex + 1)
    }
  },
  actions: {
    isItemSelected(item: Item | string): boolean {
      return this.selectedItem !== null && !!item && this.getItem(item)?._id === this.selectedItem?._id
    },
    setSelectedItem(value: Item | string | SanityReference) {
      this.selectedItem = this.getItem(value)
    },
    setCurrentFlow(flow: string | SanityDocument | undefined = undefined) {

      if (!flow) {
        this.currentFlow = this.flows[0]
      } else if (typeof flow === 'string') {
        this.currentFlow = this.flows.find(i =>
          [i._id, i.slug.current].includes(flow)
        )
      } else {
        this.currentFlow = flow
      }

      this.nextSteps = this.currentFlow.steps.map(step => {
        const s = this.getStep(step)
        return ({
          ...s,
          items: s.items?.map(i => this.getItem(i)) || []
        })
      })
      this.currentStepIndex = 0
    },
    goBack() {

      const p = this.prevSteps.pop()

      this.nextSteps = [p, ...this.nextSteps]

      this.selectedItem = null;

      this.showModal = false;

      this.selectedItem = null
    },
    goNext() {
      if (this.isLastStep) {
        this.status = 'final'
        this.selectedItem = null

      } else if (this.currentStep?.type === 'choose' && this.currentStep?.items && !this.showModal) {
        this.showModal = true
      } else {

        const curr = _.head(this.nextSteps)

        this.nextSteps = _.drop(this.nextSteps)

        this.prevSteps = [...this.prevSteps, curr]

        this.selectedItem = null;

        this.showModal = false;

        return true;
      }

    },
    getItem(value: Item | string | SanityReference) {
      if (!value) {
        return null;
      }

      let id: string;

      if (typeof value === 'string') {
        id = value
      } else if (value._ref) {
        id = value._ref
      } else {
        id = value._id
      }

      return this.items.find(i => i._id === id) || null

    },
    getStep(value: Step | string | SanityReference) {
      if (!value) {
        return null;
      }

      let id: string;

      if (typeof value === 'string') {
        id = value
      } else if (value._ref) {
        id = value._ref
      } else {
        id = value._id
      }

      return this.steps.get(id) || null

    },
    async fetchData() {
      const query = groq`{
      'items':*[_type == "item"],
      'steps':*[_type == "step"],
      'flows':*[_type == "flow"],
      'inputs':*[_type == "input"],
      'topics':*[_type == "topic"],
      }`;

      const res = await useSanityQuery(query);

      const {data, error} = res

      const {items, steps, flows, inputs, topics} = data.value

      this.items = items
      this.inputs = inputs
      this.topics = topics
      this.items = items
      this.flows = flows

      for (const step of steps) {
        this.steps.set(step._id, step)
      }

      this.setCurrentFlow("58d43c05-7d6e-45e6-a38b-95bdaced36c1");
      this.currentStepIndex = 0
    },
  },
})