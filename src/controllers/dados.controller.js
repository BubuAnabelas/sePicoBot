export const dados = (client, args, channel, tags, message, self) => {
    let dados = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
    let dadoUno = dados[Math.floor(Math.random() * dados.length)];
    let dadoDos = dados[Math.floor(Math.random() * dados.length)];
    let dadoTres, dadoCuatro;
    if (dadoUno === dadoDos) {
        dadoTres = dados[Math.floor(Math.random() * dados.length)];
        dadoCuatro = dados[Math.floor(Math.random() * dados.length)];
    }
    client.say(
        channel,
        `@${tags.username} tiraste ${dadoUno} ${dadoDos} y ${dadoTres ? "y " + dadoTres + " " + dadoCuatro : ""} }`
    );
}