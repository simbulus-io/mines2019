<template>
    <div class="m-content">
        <div> <!-- TODO: do something meaningful with this binding/clean up -->
            <h1 v-show="lesson_idx===''"> No Lesson Selected </h1>
            <div v-show="lesson_idx!==''">
                <h1>{{lesson_grade}} Lesson {{lesson_number}} Module {{lesson_module}} from {{lesson_provider}}</h1>
                <h4>Status: {{lesson_status}}</h4>
                <select v-model="lesson_status">
                    <!-- <option disabled value="">Please select one</option> -->
                    <option>unprocessed</option>
                    <option>processed - accepted</option>
                    <option>processed - rejected</option>
                </select>
                <h4>Notes</h4>
                <textarea
                    class="lesson-input"
                    v-model="lesson_notes"
                    rows="5">
                </textarea>
                <!-- <textarea
                    class="lesson-input"
                    v-model="lesson_keywords"
                    rows="5">
                </textarea> -->
                <h4>Keywords</h4>
                <vue-tags-input
                    v-model="tag"
                    :allow-edit-tags="true"
                    :tags="validated_tags"
                    @tags-changed="update_keywords"/>
                <!-- TODO: make text area prettier and have spaces in between items in the array -->
                <!-- TODO: maybe make each note it's own text area? -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./leaf-view.ts"></script>
<style scoped lang="scss">
@import "../styles/common.scss";
.lesson-input {
    width: 100%;
}
</style>