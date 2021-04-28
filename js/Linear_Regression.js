const learning_rate = 0.1;
const epochs = 1000;

class Data {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Hypothesis {
    constructor() {
        this.w = Math.random()
        this.b = Math.random()
    }

    H(x) {
        return this.w * x + this.b
    }
}

let hypothesis = new Hypothesis();

function Regression(DataSet, size) {
    let h = 0;
    let cost = 0;
    let gradient_w = 0;
    let gradient_b = 0;

    for (epoch = epochs; epoch > 0; epoch--) {
        gradient_w = 0;
        gradient_b = 0;
        DataSet.forEach(e => {
            gradient_w += ((-2) * e.x * (hypothesis.w * e.x + hypothesis.b - e.y)) / (size);
            gradient_b += ((-2) * (hypothesis.w * e.x + hypothesis.b - e.y)) / (size);

        });
        hypothesis.w += learning_rate * gradient_w;
        hypothesis.b += learning_rate * gradient_b;
    }

}