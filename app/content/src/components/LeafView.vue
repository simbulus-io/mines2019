<template>
    <div>
        <div> <!-- TODO: do something meaningful with this binding/clean up -->
            <p v-show="content!==null"> it not null </p>
            <p v-show="content===null"> it null </p>
            <p> TODO: put something here </p>
        </div>
    </div>
</template>

<script lang="ts" src="./leaf-view.ts"></script>
<style scoped lang="scss">
@import "../styles/common.scss";
</style>