import {Guid} from 'guid-typescript'
'use strict';

export default class random_snote {
    TITLES = [
        'Ms. ','Mr. ',
    ];
    
    AUTHORS = [
        'Anchorage', 'Berlin', 'Cucamonga', 'Davenport', 'Essex', 'Fresno',
        'Gunsight', 'Hanover', 'Indianapolis', 'Jamestown', 'Kane', 'Liberty',
        'Minneapolis', 'Nevis', 'Oakland', 'Portland', 'Quantico', 'Raleigh',
        'SaintPaul', 'Tulsa', 'Utica', 'Vail', 'Warsaw', 'XiaoJin', 'Yale',
        'Zimmerman',
    ];
    
    CONTENT = [
      'Great Work!', 'Please show more work next time.', 'You have a great understanding of double negation!',
      'Please come see me.','You solved this in a unique way!','Wonderful improvement!',
    ];
    
    constructor() { }
    
    randomItem(array: string[]) {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
    
    random_name() {
        return this.randomItem(this.TITLES) + this.randomItem(this.AUTHORS);
    }
    
    random_content() {
        return this.randomItem(this.CONTENT);
    }
    
    random_x() {
        const SCREEN_WIDTH = 810;
        return Math.floor(Math.random() * SCREEN_WIDTH);
    }
    
    random_y() {
        const SCREEN_HEIGHT = 540;
        return Math.floor(Math.random() * SCREEN_HEIGHT);
    }
    
    get_idx() {
        return Guid.raw();
    }

    get_timestamp() {
        return Date.now();
    }
  
}

export { random_snote };
