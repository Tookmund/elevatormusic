var audio = new Audio('celtic-woman.wav');

const App = {
    data() {
        return {
            state: 'start', // start, still, up, and down
            hasAccelerometer: true
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
        },

        startApp() {
            this.setState('still');
            requestMotion();
        }
    }
};

var elevatorApp = Vue.createApp(App).mount('#app');