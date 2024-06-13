function createCounter() {
    let count = 0;

    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getValue: function() {
            return count;
        }
    };
}

const counter = createCounter();

document.getElementById('increment').addEventListener('click', () => {
    const value = counter.increment();
    document.getElementById('value').textContent = value;
});

document.getElementById('decrement').addEventListener('click', () => {
    const value = counter.decrement();
    document.getElementById('value').textContent = value;
});
