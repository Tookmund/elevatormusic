const App = {
    data() {
        return {
            state: 'start' // start, still, up, and down
        };
    },
    methods: {
        setState(newState) {
            this.state = newState;
        }
    }
};

Vue.createApp(App).mount('#app');