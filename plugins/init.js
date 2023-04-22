import {defineNuxtPlugin} from '#app';
import {useWorkflowsStore} from "~/store/workflows";

export default defineNuxtPlugin(async (nuxtApp) => {
    const route = useRoute();
    const config = useRuntimeConfig();

    const workflowsStore = useWorkflowsStore(nuxtApp.$pinia)

    await workflowsStore.fetchData()

    await workflowsStore.setCurrentFlow(route.params.slug)


});

