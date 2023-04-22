import {useWorkflowsStore} from "~/store/workflows";

export default defineNuxtPlugin((NuxtApp) => {
    const workflowStore = useWorkflowsStore()

    function getWorkflowLink(slug) {
        const w = workflowStore.getWorkflow(slug)


        if (!w) return null;

        return `/workflows/${w?.slug.current}`
    }

    return {
        provide:{
            genero: {getWorkflowLink}
        }
    }
})