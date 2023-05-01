<template>

  <PageHeading>
    Glossary
  </PageHeading>
  <article>
    <div class="grid grid-cols-12 gap-x-md gap-y-[45px] px-outsides ">
      <template v-for="[letter,words] in alphabet.entries()">
        <div v-if="words.length" class="col-start-4 glossary-letter-wrapper text-right">
          <div
              class="glossary-letter ">
            {{
              letter.toUpperCase()
            }}{{ letter.toLowerCase() }}
          </div>
        </div>

        <div v-for="word in words" class="word">
          <h3 class="font-mono text-4xl font-bold py-sm">{{ word.display || word.word }}</h3>
          <div class="prose">
            <SanityContent v-if="word.content" :blocks="word.content"/>
            <p v-else>Lorem ipsum dolor sit amet consectetur. Ultrices ullamcorper morbi viverra tellus. Purus vulputate
              eget nulla suscipit ornare ut malesuada pellentesque.</p>
          </div>
        </div>

      </template>
    </div>

  </article>
</template>

<script setup lang="ts">
import {useStore} from "~/store/store";
import {storeToRefs} from "pinia";
import {Glossary} from "~/types";

const store = useStore()

const {glossary} = storeToRefs(store)

const alpha = Array(26).fill(0).map((_, i) => [String.fromCharCode(i + 65), []])

const alphabet = ref<Map<string, Glossary[]>>(new Map(alpha))

for (const [key, word] of glossary.value.entries()) {
  alphabet?.value?.get(key.toUpperCase()[0]).push(word)
}

</script>

<style scoped lang="scss">
.glossary-letter {
  @apply inline-block text-5xl font-mono font-bold bg-primary aspect-square p-sm w-20 h-20 inline-flex items-center justify-center  normal-case text-white;

  &-wrapper {
    @apply sticky;

    top: calc(var(--spacing-lg) + var(--spacing-navbar));
  }
}

.word {
  @apply col-span-5 col-start-5 border-t-2 border-primary;

  h3 {

    leading-trim: both;
    text-edge: cap alphabetic;
    line-height: .6;
  }
}

</style>