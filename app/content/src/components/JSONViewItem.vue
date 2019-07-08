<template>
  <div class="json-view-item">
    <!-- Handle Objects and Arrays-->
    <div v-if="data.type === 'object' || data.type === 'array'">
      
      <div @click.stop="toggleOpen" class="data-key" :style="keyColor">
        <div class="data-key-arrow">
          <div :class="classes" :style="arrowStyles"></div>
          {{ data.key }}:
        </div>
        <span class="properties">&nbsp;{{ num_filter_nested }}</span>
      </div>

      <json-view-item
        v-on:selected="bubbleSelected"
        v-for="child in data.children"
        :key="getKey(child)"
        :data="child"
        v-show="open"
        :maxDepth="maxDepth"
        :styles="styles"
        :canSelect="canSelect"
        :filter="filter"
        :filter_cat="filter_cat"
      />

    </div>
    <!-- Handle Leaf Values -->
    <div
      :class="valueClasses"
      v-on:click="clickEvent(data)"
      v-if="data.type === 'value'"
    >
      <span :style="valueKeyColor">{{ data.key }}</span>
      <span :style="getValueStyle(data.value)">
        {{data.value}}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { log }                 from '@/logger';
import { Lesson }               from './lesson';

export interface SelectedData {
  key: string;
  value: string;
  path: string;
}

export interface Data {
  [key: string]: string;
}

export default Vue.extend({
  name: "json-view-item",
  data: function() {
    return {
      open: this.data.depth < this.maxDepth
    };
  },
  props: {
    data: {
      required: true,
      type: Object
    },
    maxDepth: {
      type: Number,
      required: false,
      default: 1
    },
    styles: {
      type: Object,
      required: true
    },
    canSelect: {
      type: Boolean,
      required: false,
      default: false
    },
    filter: {
      type: String,
      required: true
    },
    filter_cat: {
      type: String,
      required: true
    },
  },
  methods: {
    toggleOpen: function(): void {
      this.open = !this.open;
    },
    clickEvent: function(data: Data): void {
      this.$emit("selected", {
        key: data.key,
        value: data.value,
        path: data.path
      } as SelectedData);
    },
    bubbleSelected: function(data: Data): void {
      this.$emit("selected", data);
    },
    getKey: function(value: any): string {
      if (!isNaN(value.key)) {
        return value.key + ":";
      } else {
        return '"' + value.key + '":';
      }
    },
    getValueStyle: function(value: any): object {
      const type = typeof value;
      const style_data = {
        color: '#fefefe',
        opacity: 0.6,
      };
      if ( value === this.filter || value.includes('no ')) {
        style_data.color = '#519fe4';
        style_data.opacity = 1;
        return style_data;
      }
      switch (type) {
        case "string":
          style_data.color = this.styles.string;
          break;
        case "number":
          style_data.color = this.styles.number;
          break;
        case "boolean":
          style_data.color = this.styles.boolean;
          break;
        case "object":
          style_data.color = this.styles.null;
          break;
        default:
          style_data.color = this.styles.valueKeyColor;
          break;
      }
      return style_data;
    }
  },
  computed: {
    classes: function(): object {
      return {
        "chevron-arrow": true,
        opened: this.open
      };
    },
    valueClasses: function(): object {
      return {
        "value-key": true,
        "can-select": this.canSelect
      };
    },
    arrowStyles: function(): object {
      return { width: this.styles.arrowSize, height: this.styles.arrowSize };
    },
    lengthString: function(): string {
      // TODO: change this from properties to reflect desired verbage dynamically
      let rval = '';
      if (this.data.type === "array") {
        rval += (this.data.length === 1
          ? this.data.length + " Element"
          : this.data.length + " Elements");
      } else if ( this.data.depth === 1 ) {
        rval += (this.data.length === 1
        ? this.data.length + " Grade"
        : this.data.length + " Grades");
      } else if ( this.data.depth === 2 ) {
        rval += (this.data.length === 1
        ? this.data.length + " Module"
        : this.data.length + " Modules");
      } else if ( this.data.depth === 3 ) {
        rval += (this.data.length === 1
        ? this.data.length + " Lesson"
        : this.data.length + " Lessons");
      } else {
        rval += (this.data.length === 1
        ? this.data.length + " Property"
        : this.data.length + " Properties");
      }
      return `${rval} - ${this.num_filter_nested}`;
    },
    // made to show # of unprocessed at each level of the tree 
    num_filter_nested: function(): string {
      const lessons:Lesson[] = this.$store.state.content.content_lessons;
      let num_tot_lessons = 0;
      let num_filter_lessons = 0;
      lessons.forEach((lesson: Lesson) => {
        const path_arr: string[] = this.data.path.split('/');
        path_arr.shift(); // remove 'root' from path
        let path = path_arr.join('/');
        if( this.data.depth !== 0 ){ // add current key to path except when in root
          path += this.data.key;
        }
        //log.info(`at node: ${this.data.key} checking if ${path} in ${lesson.path}`);
        if (lesson.path.includes(path)) {
          num_tot_lessons++;
          if (this.filter_cat === 'status') {
            if(lesson[this.filter_cat]===this.filter){
              num_filter_lessons++;
            }
          } else {
            if (lesson[this.filter_cat].length===0) {
              num_filter_lessons++;
            }
          }
          
        }
      });
      return `${num_filter_lessons} of ${num_tot_lessons}`;
    },
    keyColor: function(): object {
      return { color: this.styles.key };
    },
    valueKeyColor: function(): object {
      return { color: this.styles.valueKey };
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../styles/common.scss";
.json-view-item {
  margin-left: 20px;
}

.value-key {
  font-weight: 600;
  margin-left: 10px;
  border-radius: 2px;
  white-space: nowrap;
  padding: 5px 5px 5px 10px;

  &.can-select {
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
}
.data-key-arrow {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.data-key {
  display: flex;
  justify-content: space-between;
  //flex-direction: column;
  //align-items: flex-start;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  padding: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .properties {
    font-weight: 600;
    opacity: 0.6;
    user-select: none;
    margin-right: 10px;
  }
}

.value-key {
  display: flex;
  justify-content: space-between;
}

.chevron-arrow {
  flex-shrink: 0;
  border-right: 4px solid $lightest_gray;
  border-bottom: 4px solid $lightest_gray;
  width: 6px;
  height: 6px;
  margin-right: 20px;
  margin-left: 5px;
  transform: rotate(-45deg);

  &.opened {
    margin-top: -3px;
    transform: rotate(45deg);
  }
}
</style>
