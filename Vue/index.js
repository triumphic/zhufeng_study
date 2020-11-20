const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

createFlow([
    () => log("a"),
    () => log("b"),
    subFlow,
    [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => {
    console.log("done");
});
