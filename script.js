var celticWoman = new Audio('celtic-woman.wav');
var down = new Audio('down.wav');

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
                celticWoman.play();
            } else {
                celticWoman.pause();
                celticWoman.currentTime = 0;
            }

            if (this.state == 'down') {
                down.play();
            } else {
                down.pause();
                down.currentTime = 0;
            }
        },

        startApp() {
            this.setState('still');
            requestMotion();
        }
    }
};

var elevatorApp = Vue.createApp(App).mount('#app');