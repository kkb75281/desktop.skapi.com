<template lang="pug">
#overlayWindow.deleteRecord(@click="emits('close')" style='--max-width: 376px;')
    .overlayWrap(@click.stop)
        header
            h5.title.red Delete Record
        main
            .content
                p You sure want to delete {{ toDelete.count > 1 ? toDelete.count + ' records' : 'the record'}}?
                p This process cannot be undone.
                br
                br
                .buttonWrap 
                    //- template(v-if="promiseRunning")
                    //-     img.loading(src="@/assets/img/loading.png")
                    //- template(v-else)
                    button.cancel(@click="emits('close')") Cancel
                    button.save(@click="toDelete.cb();emits('close')") Delete
</template>

<script setup>
import { skapi } from '@/main.js';
import { currentService } from '@/data.js';
import { ref } from 'vue';

let emits = defineEmits(['close']);
let {toDelete} = defineProps(['toDelete']);
// let promiseRunning = ref(false);

</script>