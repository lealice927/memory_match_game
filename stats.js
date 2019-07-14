class Stats {
    constructor() {
      this.matches = 0;
      this.attempts = 0;
      this.accuracy = 0;
      this.highest_accuracy = 0;
  
      this.display_stats();
      this.setNewHighScore();
    }