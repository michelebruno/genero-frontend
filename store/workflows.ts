import {defineStore} from 'pinia'
import {Item} from "~/types";
import {SanityReference} from "@sanity/client";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useWorkflowsStore = defineStore('workflows', {
  state: () => ({
    steps: [],
    items: [] as Item[],
    flows: [],
    active: null,
    selectedItem: null as Item | null,
    currentStep: null,
    flow: null
  }),
  getters: {
    canMoveOn: (state) => !!state.selectedItem,
  },
  actions: {
    isItemSelected(item: Item | string) {
      return this.selectedItem !== null && item && this.getItem(item)?._id === this.selectedItem._id
    },
    setSelectedItem(value: Item | string | SanityReference) {
      this.selectedItem = this.getItem(value)
    },
    setCurrentStep(v) {
      this.currentStep = v
    },
    getItem(value: Item | string | SanityReference) {
      if (!value) {
        this.selectedItem = null;
        return;
      }

      let id;

      if (typeof value === 'string') {
        id = value
      } else if (value._ref) {
        id = value._ref
      } else {
        id = value._id
      }

      return this.items.find(i => i._id === id) || null

    },
    async fetchItems() {
      if (!this.items) await this.fetchData()

      return this.items
    },
    async fetchData() {
      const query = groq`{
      'items':*[_type == "item"],
      'steps':*[_type == "step"],
      'flows':*[_type == "flow"],
      }`;

      const res = await useSanityQuery(query);

      const {data, error} = res

      const {items, steps, flows} = data.value

      this.items = items
      this.steps = steps
      this.flows = flows

      this.currentStep = steps[0]
    },
  },
})