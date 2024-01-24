<template lang="pug">
#overlayWindow.deleteRecord(@click="emits('close')" style='--max-width: 376px;')
    .overlayWrap(@click.stop)
        header
            .title.withIcon.red
                .material-symbols-outlined.mid.icon warning
                h5 Delete Record
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
                    button.noLine(@click="emits('close')") Cancel
                    button.unFinished.warning(@click="toDelete.cb();emits('close')") Delete
</template>

<script setup>
import { skapi } from '@/main.js';
import { currentService } from '@/data.js';
import { ref } from 'vue';

let emits = defineEmits(['close']);
let {toDelete} = defineProps(['toDelete']);
// let promiseRunning = ref(false);

</script>