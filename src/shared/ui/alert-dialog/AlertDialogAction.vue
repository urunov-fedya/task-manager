<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogAction, type AlertDialogActionProps } from 'reka-ui'
import { cn } from '@lib'
import { buttonVariants, type ButtonVariants } from '@ui'

const alertProps = defineProps<
  AlertDialogActionProps & { class?: HTMLAttributes['class']; variant?: ButtonVariants['variant'] }
>()

const delegatedProps = reactiveOmit(alertProps, 'class')
</script>

<template>
  <AlertDialogAction
    v-bind="delegatedProps"
    :class="cn(buttonVariants({ variant: alertProps.variant }), alertProps.class)"
  >
    <slot />
  </AlertDialogAction>
</template>
