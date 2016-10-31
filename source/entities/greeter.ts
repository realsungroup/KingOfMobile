class Greeter implements GreeterInterface {
    public greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    public greet() {
        return `Hello1, ${this.greeting}`;
    }
}

export default Greeter;
