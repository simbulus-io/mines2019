<template>
    <div class="m-content">
        <div> <!-- TODO: do something meaningful with this binding/clean up -->
            <!-- lesson_id: {{lesson_id}}. -->
            <div v-show="lesson_id!==''">
                <h2>Status: {{lesson_status}}</h2>
                <select class="status-input" v-model="lesson_status">
                    <option v-for="status in STATUS_VALUES" :key="status">{{status}}</option>
                </select>
                <hr/>
                <h2 style="display:inline;">Notes</h2>
                <button class="new-button"  type="button" v-on:click="new_note">
                    <font-awesome-icon icon="plus-circle" />
                </button>
                <div v-for="note in lesson_notes" :key="note.index" class="note">
                    <div class="note-row">
                        <div class="note-cell note-text">
                            <!-- {{note.index}} {{note.idx}} -->
                            <textarea
                                class="lesson-input"
                                v-model="note.text"
                                rows="5"
                                overflow="auto"
                                v-bind:class="{ 'lesson-input-inactive': !note_selected(note.index) }"
                                v-bind:readonly="!note_selected(note.index)"
                                v-on:blur="save_note(note.index, note.text)"
                                v-focus>
                            </textarea>
                        </div>
                        <div class="note-cell note-button-wrapper">
                            <button class="note-button edit-button" v-show="!note_selected(note.index)" type="button" v-on:click="edit_note(note.index)">
                                Edit Note
                            </button>
                            <button class="note-button edit-button" v-show="note_selected(note.index)" type="button" v-on:click="save_note(note.index, note.text)">
                                Save Note
                            </button>
                            <button class="note-button delete-button" type="button" v-on:click="delete_note(note.index, note.text)">
                                Delete Note
                            </button> 
                        </div>
                    </div>
                </div>
                <p v-show="lesson_notes.length === 0">No notes <font-awesome-icon icon="sad-tear"/> Add some with the plus icon!</p>
                <hr/>
                <h2>Keywords</h2>
                <vue-tags-input
                    v-model="tag"
                    :allow-edit-tags="true"
                    :tags="validated_tags"
                    @tags-changed="update_keywords"
                    v-on:blur="update_store_keywords"
                    :autocomplete-items="filteredItems"
                    :placeholder="'Tag Keywords'"
                    :separators="[',',';']"
                    id="key-tags"/>
                <hr/>
                <h2>Standards</h2>
                <div>
                    <standard-block v-for="standard in lesson_standards" :key="standard" :text="standard"/>
                    <p v-show="lesson_standards.length === 0">No standards <font-awesome-icon icon="sad-tear"/> </p>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./leaf_view.ts"></script>
<!-- DO NOT HAVE SCOPED -> tag styling will not work -->
<style lang="scss">
@import "../styles/common.scss";
.status-input {
    font-size: 14pt;
}
.lesson-input {
    width: 98%;
    font-size: 14pt;
    padding: 10px;
    resize: none;
}
.lesson-input-inactive {
    color: $white;
    background-color: inherit;
    border: none;
    outline: none;
}
.note-button {
    border: none;
    width: 98%;
    font-size: 16pt;
    border-radius: 10px;
    padding: 10px 25px;
    color: $white;
    margin: 10px 0px;
}
.delete-button {
    background-color: $wm_red;
}
.edit-button {
    background-color: $wm_green;
}
.new-button {
    display: inline;
    border: none;
    font-size: 20pt;
    color: $wm_orange;
}
.note {
    background-color: $wm_blue;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    display: table;
    width: 98%;
}

.note-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    padding: 10px;
}
.note-text {
    width: 75%;
}
.note-button-wrapper {
    width: 25%;
}
.note-row {
    display: table-row;
    width: 90%;
}

#key-tags {
    max-width: none;
    width: 98%;
    font-size: 14pt;
    color: $wm_gray;  
}

.ti-tag-input {
    font-size: 13pt;
}

.vue-tags-input .ti-tag.ti-valid {
  background-color: $wm_purple;
  color: $white;
  font-size: 14pt;
}

.vue-tags-input .ti-selected-item {
    background-color: $wm_bright_blue !important;
}

</style>