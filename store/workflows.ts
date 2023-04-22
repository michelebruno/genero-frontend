import {defineStore} from 'pinia'
import {Flow, Input, Item, Step, Topic} from "~/studio/schema";
import {SanityDocument, SanityReference} from "@sanity/client";
import _ from "lodash";
import {useStore} from "~/store/store";

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
    direction: 'forward' as 'forward' | 'backward'
  }),
  getters: {
    canMoveOn: ({currentStep, ...s}) => {
      return currentStep.type !== 'choose' ?
        true :
        !currentStep.items?.length || !!s.selectedItem

    },
    currentStep: (s): Step | undefined => {


      if (typeof s.nextSteps === 'undefined') return false;

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

      return this.currentFlow
    },
    setTheme() {
      const store = useStore()

      if (this.currentStep?.type === 'section') {
        store.setDarkTheme()
      } else store.setLightTheme()

    },
    goBack() {
      this.direction = 'backward'

      const p = this.prevSteps.pop()

      this.nextSteps = [p, ...this.nextSteps]

      this.selectedItem = null;

      this.showModal = false;

      this.selectedItem = null

      this.setTheme()
    },
    goNext() {
      this.direction = 'forward'
      if (this.status === 'onboarding') {
        this.status = 'started'
        this.setTheme()

      } else if (this.isLastStep) {
        this.status = 'final'
        this.selectedItem = null
        this.setTheme()

      } else if (this.currentStep?.type === 'choose' && this.currentStep?.items && !this.showModal) {
        this.showModal = true;
        this.setTheme()

      } else {

        const curr = _.head(this.nextSteps)

        this.nextSteps = _.drop(this.nextSteps)

        this.prevSteps = [...this.prevSteps, curr]

        this.selectedItem = null;

        this.showModal = false;
        this.setTheme()

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
    getWorkflow(value: Flow | string | SanityReference) {
      if (!value) {
        return null;
      }

      let id: string;

      if (typeof value === 'string') {
        id = value
      } else if (value._ref) {
        id = value._ref
      } else if (value._id) {
        id = value._id
      } else {
        console.warn("Error parsing workflow id")
        return false
      }
      return this.flows.find(i => ([i._id, i.slug?.current].includes(id))) || null
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

      const {data} = res

      const {items, steps, flows, inputs, topics} = data.value

      this.items = items
      this.inputs = inputs
      this.topics = topics
      this.items = items
      this.flows = flows

      for (const step of steps) {
        this.steps.set(step._id, step)
      }

    },
  },
})