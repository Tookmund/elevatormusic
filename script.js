var audio = new Audio('celtic-woman.wav');

const App = {
    data() {
        return {
            state: 'start' // start, still, up, and down
        };
    },
    methods: {
        setState(newState) {
            this.state = newState;
            if (this.state == 'up') {
                audio.play();
            } else {
                audio.pause();
                audio.currentTime = 0;
            }
        }
    }
};

Vue.createApp(App).mount('#app');